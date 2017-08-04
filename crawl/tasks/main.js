let read = require('./read');
let write = require('./write');
let async = require('async');
let Movie = require('../model');
let url = 'http://top.baidu.com/buzz?b=26&c=1&fr=topcategory_c1';
async.waterfall([
    (callback) => {
        Movie.remove({}, callback);
    },
    (data, callback) => {
        read(url, callback);
    },
    (data, callback) => {
        write(data, callback);
    }
], (error, result) => {
    console.log(error);
    console.log(result);
});