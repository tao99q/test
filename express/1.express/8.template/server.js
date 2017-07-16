/**
 * Created by zhanghongtao on 2017/7/15.
 */
let express = require('express'),
    path = require('path'),
    app = express();
//1.设置模板引擎
// app.set('view engine', 'ejs');
app.set('view engine', 'txt');
//2.设置模板存放目录    如果存放模板的文件夹名称叫views，那么这句话可以不写，但如果不叫views话，必须提供
//path.resolve 是从当前路径出发，解析路径 绝对路径
app.set('views', path.resolve('views'));
//当express发现模板的文件后缀html的话，会使用ejs来进行渲染
app.engine('.txt', require('ejs').__express);
let users = [{id: 1, name:'a'}, {id: 2, name: 'b'}, {id: 3, name: 'c'}];
app.get('/users', (req, res) => {
    //渲染 绘制  渲染就是把静态的模板和动态的数据对象进行混合生成HTML代码的过程
    // express 为响应对象res添加了一个render方法
    //res.render(view, [locals], callback);
    //参数view就是模板的文件名
    //在渲染模板时locals可为其模板传入变量值
    //callback用来处理返回的渲染后的字符串
    res.render('index', {title: '首页'});
});
app.listen(8088);