/**
 * Created by zhanghongtao on 2017/7/16.
 */
let express = require('express'),
    cookieParser = require('cookie-parser'),
    app = express();
app.use(cookieParser('zfpx'));
app.get('/write', (req, res) => {
    res.cookie('name', 'aaa', {
        // domain:'127.0.0.1',
        // path: '/read',
        // expires: new Date(Date.now() + 20 * 1000),
        maxAge: 10 * 1000
    });
    res.send('ok');
});
app.get('/read', (req, res) => {
    console.log(req.cookies);
    res.send(req.cookies);
});
app.listen(8088);