/**
 * Created by zhanghongtao on 2017/7/15.
 */
let express = require('express'),
    //能过Router方法得到路由中间件实例
    router = express.Router();
router.all('/signup1', (req, res) => {
    res.send('注册1111');
});
router.all('/signin1', (req, res) => {
    res.send('登陆1111');
});
module.exports = router;