/**
 * Created by zhanghongtao on 2017/7/9.
 */
const http = require('http');
const fs = require('fs');
const url = require('url');
const mime = require('mime');
let users = [{id: 1, username: 'a1', password: 'b1'}, {id: 2, username: 'a2', password: 'b2'}];
http.createServer(function (req, res) {
    let {pathname, query} = url.parse(req.url, true);
    let reg = /\.(\w+)$/i;
    pathname = pathname === '/' ? '/index.html' : pathname;

    if (fs.existsSync('.' + pathname)) {
        res.setHeader("Content-type", mime.lookup(reg.exec(pathname)[1]) + ";charset=utf-8");
        fs.createReadStream('.' + pathname).pipe(res);
    } else if (pathname === '/user') {
        let id = query.id;
        switch (req.method) {
            case 'GET':
                let data = {};
                if (id) {
                    users.forEach(item=>{
                       if(id=== item.id){
                           data = item;
                       }
                    });
                } else {
                    data = users;
                }
                res.end(JSON.stringify(data));
                break;
            case 'POST':
                let str = '';
                req.on('data', (data) => {
                    str += data;
                });
                req.on('end', () => {
                    let user = JSON.parse(str);
                    user.id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
                    users.push(user);
                    res.end(JSON.stringify(users));
                });
                break;
            case 'PUT':
                break;
            case 'DELETE':
                break;
        }
    } else {
        // res.setHeader("Content-type", mime.lookup("html") + ";charset=utf-8");

        console.log(pathname);
        res.status = 404;
        res.end("Not Found");
    }
}).listen(8085);