/**
 * Created by zhanghongtao on 2017/7/15.
 */
let express = require('express'),
    app = express(),
    url = require('url');
app.get('/user',(req,resp) =>{
   let method = req.method;
   // let {pathname,query} = url.parse(req.url,true);
    console.log('pathnmae=' ,req.path);
    console.log('query=' , req.query);
    console.log(req.headers);
    resp.end('ok');
});
let users = [
    {id:1,name:'zp1'},
    {id:2,name:'zp2'}
];
app.get('/users/:id/:name',(req,res) => {
    console.log('params=' , req.params);
    let id = req.params.id;
    let name = req.params.name;
    console.log('name=' , name);
    let user = users.find(item=>item.id == id);
    res.end(user.name);
})
app.listen(8088);