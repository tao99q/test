/**
 * Created by zhanghongtao on 2017/7/8.
 */
const fs = require('fs');
const EventEmitter = require('events');
let util = require('util');
let school = {};
//
// fs.readFile('name.txt', 'utf-8', function (error, data) {
//     school.name = data;
//     e.emit('输出');
// });
// fs.readFile('age.txt', 'utf-8', function (error, data) {
//     school.age = data;
//     e.emit('输出');
// });

// let print = function () {
//     if (Object.keys(school).length == 2) {
//         console.log(school);
//     }
// };
// let e = new EventEmitter();
// e.on('输出', print);

function read(url) {
    return new Promise(function (resolve, reject) {
        fs.readFile(url, 'utf-8', function (error, data) {
            if (error) reject(error);
            resolve(data)
        });
    });
}

Promise.all([read("name.txt"), read("age.txt")]).then(values => {
    [school.name, school.age] = values;
    console.log(school);
});
