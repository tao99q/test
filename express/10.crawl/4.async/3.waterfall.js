let async = require('async');

waterfall([
    (cb) => {
        setTimeout(() => {
            console.log(1);
            cb(null, "1");
        }, 2000)
    },
    (data, cb) => {
        setTimeout(() => {
            console.log(2 + data);
            cb(null, "2" + data);
        }, 3000)
    },
    (data, cb) => {
        setTimeout(() => {
            console.log(3 + data);
            cb(null, "1111113");
        }, 3000)
    }
], (err, result) => {
    console.log(err);
    console.log(result);
});

function waterfall(tasks, callback) {

    let i = 0;
    let result = [];

    function next(err, data) {
        if (err || i >= tasks.length) {
            callback(err, data);
            return;
        } else {
            let task = tasks[i];

            if (i > 0) {
                task(data, next);
            } else {
                task(next);
            }
            i++

        }

    }

    next();
}