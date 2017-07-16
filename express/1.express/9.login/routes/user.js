/**
 * Created by zhanghongtao on 2017/7/16.
 */
let express = require('express'),
    router = express.Router();

let users = [];
router.get('/signup', (req, res) => {
    res.render('signup');
});
router.post('/signup', (req, res) => {
    let user = req.body;
    let olduser = users.find(item => item.username === user.username);
    if (olduser) {
        res.redirect('back');
    } else {
        users.push(user);
        res.redirect('/user/signin');
    }
});
router.get('/signin', (req, res) => {
    res.render('signin');
});
router.post('/signin', (req, res) => {
    let user = req.body;
    let curUser = users.find(item => {
        return item.username === user.username && item.password === user.password;
    });
    if (curUser) {
        res.redirect('/user/welcome');
    } else {
        res.redirect('back');
    }
});
router.get('/welcome', (req, res) => {
    res.send('欢迎');
});
module.exports = router;