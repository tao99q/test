/**
 * Created by zhanghongtao on 2017/7/15.
 */
let express = require('express'),
    //能过Router方法得到路由中间件实例
    router = express.Router();
router.all('/signup3/test', (req, res) => {
    res.send('注册333test');
});
router.all('/signup3/:id', (req, res) => {
    res.send('注册333id');
});
router.all('/signin3', (req, res) => {
    res.send('登陆333');
});
module.exports = router;