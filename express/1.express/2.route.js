/**
 * Created by zhanghongtao on 2017/7/15.
 */
let express = require('express');
let app = express();
app.get('/signup', (req, resp) => {
    resp.setHeader('Content-type','text/html;charset=utf-8');
    resp.end('注册');
});
app.get('/signin', (req, resp) => {
    resp.setHeader('Content-type','text/html;charset=utf-8');
    resp.end('登陆');
});
app.get('/*',(req, resp) => {
    resp.setHeader('Content-type','text/html;charset=utf-8');
    resp.end('其它');
})
app.listen(8088);

