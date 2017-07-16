/**
 * Created by zhanghongtao on 2017/7/8.
 */
function buyPack() {
    return new Promise(function (resolve, reject) {
        if (Math.random() * 10 > 5) {
            resolve('ok');
        } else {
            reject('error');
        }

    });
}
buyPack().then(function (data) {
    console.log(data);
}).catch(function (data) {
    console.log(data);
});

