/**
 * Created by zhanghongtao on 2017/7/15.
 */
let express = require('express'),
    app = express();
app.use((req,res,next)=>{
    console.log('1');
    res.end('end');
    next();
});
app.get('/home', (req, res) => {
    res.end('首页');
});
app.get('/home', (req, res) => {
    res.end('首页2');
});
app.listen(8088);