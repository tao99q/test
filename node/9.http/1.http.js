/**
 * Created by zhanghongtao on 2017/7/9.
 */
const http = require('http');
let listener = function (req,res) {
    console.log('ok');
    res.setHeader('Content-type','text/plan;charset=utf-8');
    res.setHeader('a',1);
    res.write('ok');
    res.send()
    res.end();
};
http.createServer(listener).listen(8085);