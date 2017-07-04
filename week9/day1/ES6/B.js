/**
 * Created by zhanghongtao on 2017/6/26.
 */
let A = require("./A");
module.exports = {
    avg: (...arg) => {
        arg.sort((a, b) => a - b);
        arg.shift();
        arg.pop();
        return (A.sumArrow(...arg) / arg.length).toFixed(2);
    }
}