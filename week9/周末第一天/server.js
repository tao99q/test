/**
 * Created by zhanghongtao on 2017/6/24.
 */
var http = require('http');
var fs = require('fs'),
    url=require("url");
http.createServer(function (request, response) {
    var urlObj = url.parse(request.url);
    // 发送 HTTP 头部
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    response.writeHead(200, {'Content-Type': 'text/plain'});

    // 发送响应数据 "Hello World"
    response.end('Hello World\n');
}).listen(8888);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');