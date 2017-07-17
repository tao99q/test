/**
 * Created by zhanghongtao on 2017/7/16.
 */
let express = require('express'),
    session = require('express-session'),
    app = express();
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:'aa'
}));
app.get('/write', (req, res) => {
    req.session.name = 1;
    res.send('write ok');
});
app.get('/read', (req, res) => {
    console.log(typeof req.session.name);
    res.send(req.session.name);
});
app.listen(8088);