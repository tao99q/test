/**
 * Created by zhanghongtao on 2017/6/27.
 */
let http = require("http"),
    url = require("url"),
    fs = require("fs");

http.createServer((req, res)=>{
    let {pathname,query} = url.parse(req.url,true);
    let pathReg = /\.([0-9a-zA-Z]+)$/i;
    if (pathReg.test(pathname)) {
        let readF = null,
            status = 200;
        try {
            readF = fs.readFileSync("."+pathname);
        }catch (e){
            readF = "not found";
            status = 404;
        }
        let suffix = pathReg.exec(pathname)[1].toUpperCase(),
            suffixMIME = "text/plain";
        switch (suffix){
            case "HTML":
                suffixMIME = "text/html";
                break;
            case "JS":
                suffixMIME = "text/javascript";
                break;
            case "CSS":
                suffixMIME = "text/css";
                break;
            case "PNG":
                suffixMIME = "image/png";
                break;
            case "GIF":
                suffixMIME = "image/gif";
                break;
            case "JPG":
                suffixMIME = "image/jpeg";
                break;
            case "JPEG":
                suffixMIME = "image/jpeg";
                break;
        }
        res.writeHead(status,{
            "content-type":suffixMIME+";charset=utf-8;"
        });
        res.end(readF);
    }
    res.end("The requested file is not a resource file")
}).listen(62334,()=>{
    console.log("localhost:62334 running");
});