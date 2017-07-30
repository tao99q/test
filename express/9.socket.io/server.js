let express = require('express'),
    app = express(),
    path = require('path'),
    Message = require('./model');

app.use(express.static(path.resolve('node_modules')))
app.get('/', (req, res) => {
    res.sendFile(path.resolve('index.html'));
});

let server = require('http').createServer(app);
let io = require('socket.io')(server);
let sockets = {};
io.on('connection', (socket) => {
    let username;
    let currentRoom;
    socket.on('message', (msg) => {
        let msgObj = {};//fromAuthor 发送用户名 toAuthor 接收用户名 type 消息类型 0 广播 1 接收   content 消息内容  createAt 创建时间
        let content;
        if (username) {
            let reg = /@([^ ]+) (.+)/;
            let result = msg.match(reg);
            if (result) {
                let toUser = result[1];
                content = result[2];
                msgObj.author = username;
                msgObj.type = 0;
                msgObj.content = content;
                msgObj.createAt = new Date().toLocaleString();
                let toSocket = sockets[toUser];
                if (toSocket) {
                    toSocket.send(msgObj);
                }

            } else {
                content = msg;
                msgObj.author = username;
                msgObj.type = 1;
                msgObj.content = content;
                msgObj.createAt = new Date().toLocaleString();
                Message.create(msgObj, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        if (currentRoom) {
                            io.in(currentRoom).emit('message', msgObj);
                        } else {
                            io.emit('message', msgObj);
                        }
                    }
                });


            }
        } else {
            username = msg;
            sockets[username] = socket;
            content = `进入聊天室`;
            msgObj.author = username;
            msgObj.type = 1;
            msgObj.content = content;
            msgObj.createAt = new Date().toLocaleString();
            io.emit('message', msgObj);

        }


        // socket.send(msg);

    });
    socket.on('getAllMessage', () => {
        Message.find({}).sort({createAt: -1}).limit(20).exec((err, mesages) => {
            mesages.reverse();
            socket.emit('allMessage', mesages);
        });
    });

    socket.on('join', (roomName) => {
        if (currentRoom) {
            socket.leave(currentRoom);
        }
        socket.join(roomName);
        currentRoom = roomName;
        socket.emit('joined',roomName);
    });

    socket.on('delete',(id)=>{
        io.emit('deleted',id);
    });
});
server.listen(8080);