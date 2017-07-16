/**
 * Created by zhanghongtao on 2017/7/16.
 */
let http = require('http'),
    querystring = require('querystring');

let server = http.createServer((req, res) => {
    let url = req.url;
    if (url === '/write') {
        res.setHeader('Set-cookie', ['name=aaa', 'age=12']);
        res.end('write ok');
    } else if (url === '/read') {
        let cookie = req.headers.cookie;
        let cookieObj = querystring.parse(cookie, '; ');
        res.end('age:' + cookieObj.age);
    } else if (url === '/visit') {
        let cookie = req.headers.cookie;
        let cookieObj = querystring.parse(cookie, '; ');
        let visit = cookieObj.visit;
        let count = visit ? parseInt(visit) + 1 : 1;
        res.setHeader('Set-cookie', `visit=${count}`);
        res.setHeader('Content-type', 'text/html;charset=utf-8');
        res.end(`第${count}访问`);
    } else {
        res.status(404);
        res.end();
    }
}).listen(8088);