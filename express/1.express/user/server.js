/**
 * Created by zhanghongtao on 2017/7/15.
 */
let express = require('express'),
    path = require('path'),
    app = express();
app.set('view engine','ejs');
app.set('views', path.resolve('views'));
app.get('/user/:id/:name',(req,res)=>{
    let query = req.params;//路径参数
    // let query = req.query; //查询字符串

    res.render('userinfo',query);
});


app.listen(8088);