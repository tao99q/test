/**
 * Created by zhanghongtao on 2017/7/9.
 */
const fs = require('fs');
let ws = fs.createWriteStream('./3.txt',{highWaterMark:1});
let flag  = ws.write('12234');
console.log(flag);
ws.end('硅藻');