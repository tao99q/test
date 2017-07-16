/**
 * Created by zhanghongtao on 2017/7/15.
 */
let express = require('express'),

    //能过Router方法得到路由中间件实例
    router = express.Router();
router.all('/signup/:id/:name', (req, res) => {
    let id = req.params.id;
    let name = req.params.name;
    console.log(id,name);
    res.send('注册category');
});
router.all('/signin', (req, res) => {
    res.send('登陆category');
});
module.exports = router;