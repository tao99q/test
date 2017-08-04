let files = [
    {fileanme: '1.txt', content: '1'},
    {fileanme: '1.txt', content: '1'},
    {fileanme: '1.txt', content: '1'}
];

let fs = require('fs'),
    async = require('async');


async.waterfall([
    (cb) => {
        files.forEach((item) => {
            fs.writeFile('./'+item.name, item.content, "utf8",null);
        });
        cb(null, files)
    },
    (data, cb) => {
        console.log(data);
    }
], function (err, result) {
    console.log(err);
    console.log(result);
})