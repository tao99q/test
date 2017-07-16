/**
 * Created by zhanghongtao on 2017/7/15.
 */
let http = require('http'),
    url = require('url');
http.createServer((req, resp) => {
    //获取请求方法 get post
    let method = req.method;
    //获取请求路径
    let url = req.url;
    resp.setHeader("Content-type","text/html;charset=utf-8;");
    if(method === 'GET' && url === '/signup'){
        resp.end('注册');
    } else if(method === 'GET' && url === '/signin'){
        resp.end('登陆');
    }else{
        resp.end('Not Found');
    }

}).listen(8088, () => console.log("8088 is listening"));
