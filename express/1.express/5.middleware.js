/**
 * Created by zhanghongtao on 2017/7/15.
 */
let express = require('express'),
    http = require('http'),
    STATUS_CODES = http.STATUS_CODES;
app = express();
app.use((req, res, next) => {
    res.setHeader('Content-type', 'text/html;charset=utf-8');
    res.sendStr = function (obj) {
        let type = typeof obj;
        switch (type) {
            case 'object':
                obj = JSON.stringify(type);
                break;
            case 'number':
                if (http.STATUS_CODES[obj]) {
                    obj = STATUS_CODES[obj];
                } else {
                    obj = obj.toString();
                }
                break;
            default:
                obj = obj.toString();
        }
        res.end(obj);
    };
    next();
});
app.get('/home', (req, res) => {
    res.sendStr(10);
});
app.get('/home', (req, res) => {
    res.end('首页2');
});

app.listen(8088);
