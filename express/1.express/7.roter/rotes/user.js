/**
 * Created by zhanghongtao on 2017/7/15.
 */
let express = require('express'),
    category = require('./category'),
    //能过Router方法得到路由中间件实例
    router = express.Router();
router.use('/category',category);
router.all('/signup', (req, res) => {
    res.send('注册');
});
router.all('/signin', (req, res) => {
    res.send('登陆');
});
module.exports = router;