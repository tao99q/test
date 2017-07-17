/**
 * Created by zhanghongtao on 2017/7/16.
 */
let express = require('express'),
    cookieParser = require('cookie-parser'),
    app = express();
app.use(cookieParser());
app.get('/visit', (req, res) => {
    let visit = req.cookies.visit;
    let count = visit ? parseInt(visit) + 1 : 1;
    res.cookie('visit', count);
    res.send(`第${count}次访问`);
});
app.listen(8088);