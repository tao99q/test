/**
 * Created by zhanghongtao on 2017/7/15.
 */
let express = require('express'),
    app = express(),
    user = require('./rotes/user'),
    user2 = require('./rotes/user2'),
    user3 = require('./rotes/user3'),
    category = require('./rotes/category');
app.use('/user',user);
app.use('/user',user2);
app.use('/user',user3);
// app.use('/category',category);

app.listen(8088);