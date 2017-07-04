/**
 * Created by zhanghongtao on 2017/6/25.
 */
//获取服务器时间
let serverTime = null;
let getServerTime = (callback) => {
    if (!serverTime) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "json/data.json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 2 && xhr.status == 200) {
                let time = xhr.getResponseHeader("date");
                serverTime = new Date(time);
                callback && callback(serverTime);
            }
        }
        xhr.send(null);
    } else {
        serverTime = new Date(serverTime.getTime() + 1000);
        callback && callback(serverTime);
    }

};
let addZero = (val) => (val < 10 ? "0" + val : val);

let dataFn = () => {
    let tarTime = new Date("2017/6/29 21:55:00");
    getServerTime((nowTime) => {
        let spanTime = tarTime - nowTime;
        let result = "";
        if (spanTime > 0) {
            let h = Math.floor(spanTime / (1000 * 60 * 60));
            spanTime -= h * 1000 * 60 * 60;
            let m = Math.floor(spanTime / (1000 * 60));
            spanTime -= m * 1000 * 60;
            let s = Math.floor(spanTime / 1000);
            result = `${addZero(h)}:${addZero(m)}:${addZero(s)}`;
        } else {
            result = "00:00:00";
            window.clearInterval(autoTimer);
        }
        document.querySelector(".box>span").innerHTML = result;
    });
}
let autoTimer = window.setInterval(dataFn, 1000);
