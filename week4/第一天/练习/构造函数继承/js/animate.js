/**
 * Created by Administrator on 2017/5/23.
 */
(function () {
    function animate(ele, target) {
        var begin = {}, duration, callback = {}, time = 0, sport;
        target = target || [];
        if (target.toString() == "[object Object]") {
            for (attr in target) {
                if (target.hasOwnProperty(attr)) {
                    begin[attr] = public.css(ele, attr);
                }
            }
        }
        var funAry = [], numAry = [];
        for (var i = 2; i < arguments.length; i++) {
            if (typeof arguments[i] == "function") {
                funAry.push(arguments[i]);
                continue;
            }
            if (typeof arguments[i] == "number") {
                numAry.push(arguments[i]);
                continue;
            }
        }
        if (numAry.length == 0) {
            duration = 1000;
            sport = 0
        } else if (numAry.length == 1) {
            duration = numAry[0];
            sport = 0;
        } else {
            duration = numAry[0];
            sport = numAry[1];
        }
        callback = funAry.length > 0 ? funAry[0] : function () {};
        window.clearInterval(ele.timer);
        ele.timer = window.setInterval(function () {
            if (time + 10 >= duration) {
                window.clearInterval(ele.timer);
                for (var key in target) {
                    public.css(ele, key, target[key]);
                }
                callback.call(ele);
                return;
            }
            time += 10;
            for (var key in target) {
                if (target.hasOwnProperty(key)) {
                    public.css(ele, key, begin[key] + (target[key] - begin[key]) / duration * time);
                }
            }
        }, 10)

    }

    window.animate = animate;
})();
