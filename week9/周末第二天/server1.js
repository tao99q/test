/**
 * Created by zhanghongtao on 2017/6/25.
 */
let http = require("http"),
    url = require("url"),
    fs = require("fs");
http.createServer((request, response) => {
    //true 会将query直接转成对象
    let {pathname, query} = url.parse(request.url, true);
    console.log(query);
    if(pathname=="/getUsers"){
        let cb = query["cb"];
        let data = null;
        data = fs.readFileSync("./json/data.json","utf-8");


        let str =  cb+"("+data+")";
        response.writeHead(200,{"content-type":"text/javascript;charset=utf-8;"});
        console.log(str);
        response.end(str);
    }
}).listen(1181, () => {
    console.log("1181 OK")
});