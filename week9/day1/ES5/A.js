/**
 * Created by zhanghongtao on 2017/6/26.
 */
function sum() {
    var total = 0;
    for (var i=0;i<arguments.length;i++){
        var cur = Number(arguments[i]);
        if(!isNaN(cur)){
            total += cur;
        }
    }
    return total;
}

module.exports.sum = sum;