/**
 * Created by zhanghongtao on 2017/7/16.
 */
let express = require('express'),
    app = express(),
    path = require('path'),
    //请求体解析器
    bodyParser = require('body-parser'),
    user = require('./routes/user');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'html');
app.set('views', path.resolve('views'));
app.engine('.html', require('ejs').__express);
app.use('/user', user);
app.use(express.static(path.resolve('../node_modules')));
app.use(express.static(path.resolve('')));


app.listen(8088);