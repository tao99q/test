let async = require('async');

series([
    function (callback) {
        setTimeout(function () {
            console.log(1);
            callback(null, '1');
        }, 20);
    },
    function (callback) {
        setTimeout(function () {
            console.log(2);
            callback(null, '2');
        }, 30);
    }
], function (err, result) {
    console.log(err);
    console.log(result);
});

for(var i=0;i<10000;i++){
    console.log("a");
}
function series(tasks, callback) {

    let i = 0;
    let result = [];

    function next(err, data) {
        if (i > 0) {
            result.push(data);
        }
        if (err || i >= tasks.length) {
            callback(err, result);
            return;
        } else {
            let task = tasks[i++];
            task(next);
        }

    }
    next();

}