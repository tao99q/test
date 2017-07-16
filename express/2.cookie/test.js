/**
 * Created by zhanghongtao on 2017/7/16.
 */
let str = 'name=aaa; age=i@qq';
let querystring = require('querystring');
let obj = querystring.parse(str,'; ');
console.log(obj.age);