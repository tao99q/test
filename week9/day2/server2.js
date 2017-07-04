/**
 * Created by zhanghongtao on 2017/6/27.
 */
let http = require("http"),
    url = require("url"),
    fs = require("fs");

http.createServer((req, res)=>{
    let {pathname,query} = url.parse(req.url,true);
    let pathReg = /\.[0-9a-zA-Z]+$/i;
    if (pathReg.test(pathname)) {
        let readF = null;
        try {
            readF = fs.readFileSync("."+pathname);
        }catch (e){
            readF = "not found";
        }
        res.writeHead(200,{"content-type":"text/css;charset=utf-8;"});
        res.end(readF);
    }
    res.end("The requested file is not a resource file")
}).listen(62334,()=>{
    console.log("localhost:62334 running");
});