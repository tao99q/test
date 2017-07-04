/**
 * Created by zhanghongtao on 2017/6/26.
 */
var A = require("./A");
function avg() {
    var ary = [].slice.call(arguments);
    ary.sort(function (a, b) {
        return a - b;
    });
    ary.shift();
    ary.pop();
    return (A.sum.apply(null, ary) / ary.length).toFixed(2);
}

module.exports.avg = avg;