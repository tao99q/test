/**
 * Created by zhanghongtao on 2017/7/9.
 */

const fs = require('fs');
function copy(source, target) {
    let rs = fs.createReadStream(source, {highWaterMark: 4});
    let ws = fs.createWriteStream(target, {highWaterMark: 1,flags:'a'});
    // rs.pipe(ws);
    rs.on('data', data=>{
        let flag = ws.write(data);
        if (!flag) rs.pause();
    });
    ws.on('drain',()=>{
        rs.resume();
        console.log("drain");
    });
    rs.on('end',()=>{
        ws.end();
        console.log("end");
    });
    ws.on('close',()=>{
        console.log("close");
    });
}
copy('./1.txt','./3.txt');
