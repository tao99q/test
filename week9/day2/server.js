/**
 * Created by zhanghongtao on 2017/6/27.
 */
let http = require("http");
let server = http.createServer(()=>{
    console.log("OK");
});
server.listen(8088,()=>{
    console.log("server");
});