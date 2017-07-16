/**
 * Created by zhanghongtao on 2017/7/9.
 */
const http = require('http');
const fs = require('fs');
const url = require('url');
const mime = require('mime');
http.createServer(function (req, res) {
    let {pathname, query} = url.parse(req.url, true);
    let reg = /\.(\w+)$/i;
    pathname = pathname === '/' ? '/index.html' : pathname;
    //1. /clock

    if (fs.existsSync('.' + pathname)) {
        res.setHeader("Content-type", mime.lookup(reg.exec(pathname)[1]) + ";charset=utf-8");
        fs.createReadStream('.' + pathname).pipe(res);
    } else {
        // res.setHeader("Content-type", mime.lookup("html") + ";charset=utf-8");
        if(pathname === '/clock'){
            let date = new Date().toLocaleString();
            res.end(JSON.stringify({date}));
            return;
        }
        console.log(pathname);
        res.status = 404;
        res.end("Not Found");
    }
}).listen(8085);