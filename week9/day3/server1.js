/**
 * Created by zhanghongtao on 2017/6/28.
 */
var http = require("http"),
    url = require("url"),
    fs = require("fs");

http.createServer(function (req, resp) {
    var urlObj = url.parse(req.url),
        pathname = urlObj["pathname"],
        query = urlObj["query"];
    var reg = /\.([0-9a-zA-Z]+)$/i;

    if (reg.test(pathname)) {
        var path = reg.exec(pathname)[1].toUpperCase(),
            pathMIME = "text/html";
        switch (path) {
            case "CSS":
                pathMIME = "text/css";
                break;
            case "JS":
                pathMIME = "text/javascript";
                break;
        }
        var readFile = null,
            status = 200;
        try {
            readFile = fs.readFileSync("./" + pathname, "utf-8");
        } catch (e) {
            readFile = "Sorry,Not Found";
            status = 404;
        }
        resp.writeHead(status, {
            "content-type": pathMIME + ";charset=utf-8"
        });
        resp.end(readFile);
    }

    var userData = fs.readFileSync("./data/userList.json", "utf-8");
    userData = userData.length === 0 ? "[]" : userData;
    userData = JSON.parse(userData);
    var result = {
        code: 1,
        msg: "error",
        data: null
    };
    if (pathname == "/getAllUserList") {
        if (userData.length > 0) {
            result = {
                code: 0,
                msg: "success",
                data: userData
            };
        }
        resp.writeHead(200, {"content-type": "application/json;charset=utf-8"});
        resp.end(JSON.stringify(result));
    }
    if (pathname == "/removeUser") {
        query = formate(query);
        let id = query["id"];
        userData.forEach(function (item, index) {
            if (id == item["id"]) {
                userData.splice(index, 1);
                fs.writeFileSync("./data/userList.json", JSON.stringify(userData), "utf-8");
                return;
            }
        });
        result = {
            code: 0,
            msg: "success",
            data: null
        }
        resp.writeHead(200, {"content-type": "application/json;charset=utf-8"});
        resp.end(JSON.stringify(result));
    }
    if (pathname == "/addUserInfo") {
        var strData = "";
        req.on("data", function (chunk) {
            strData = strData += chunk;
        });
        req.on("end", function () {
            query = formate(strData);
            let name = query["name"];
            let id = parseInt(userData[userData.length-1]["id"])+1;
            let user = {
                id:id,
                name:name
            };
            userData.push(user);
            fs.writeFileSync("./data/userList.json", JSON.stringify(userData), "utf-8");
            result = {
                code: 0,
                msg: "success",
                data: null
            }
            resp.writeHead(200, {"content-type": "application/json;charset=utf-8"});
            resp.end(JSON.stringify(result));
        });
        return;
    }
}).listen(8088, function () {
    console.log("listing 8088 OK");
});
function formate(str) {
    console.log(str);
    var reg = /([^&]+)=([^&]+)/g,
        obj = {};
    str.replace(reg, function () {
        obj[arguments[1]] = decodeURIComponent(arguments[2]);
    });
    return obj;
}