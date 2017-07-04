/**
 * Created by zhanghongtao on 2017/6/4.
 */
function on(ele, type, callback, bool) {
    if (/^self/.test(type)) {
        if (!ele[type + "Event"]) {
            ele[type + "Event"] = [];
        }
        var events = ele[type + "Event"];
        if (events && events.length) {
            for (var i = 0, len = events.length; i < len; i++) {
                if (events[i] == callback)return;
            }
        }

        events.push(callback);
    } else {
        if (ele.addEventListener) {
            bool = bool || false;
            ele.addEventListener(type, callback, bool);
        } else {
            if (!ele[type + "Event"]) {
                ele[type + "Event"] = [];
                ele.attachEvent("on" + type, function () {
                    e = window.event;
                    run.call(ele, e)
                });
            }
            var events = ele[type + "Event"];
            if (events && events.length) {
                for (var i = 0, len = events.length; i < len; i++) {
                    if (events[i] == callback)return;
                }
            }
            events.push(callback);
        }
    }
}
function off(ele, type, callback, bool) {
    if (/^self/.test(type)) {
        if (!ele[type + "Event"]) {
            ele[type + "Event"] = [];
        }
        var events = ele[type + "Event"];
        if (events && events.length) {
            for (var i = 0, len = events.length; i < len; i++) {
                if (events[i] == callback) {
                    events.splice(i, 1);
                    break;
                }

            }
        }
    } else {
        if (ele.removeEventListener) {
            bool = bool || false;
            ele.removeEventListener(type, callback, bool);
        } else {
            var events = ele[type + "Event"];
            if (events && events.length) {
                for (var i = 0, len = events.length; i < len; i++) {
                    if (events[i] == callback) {
                        events.splice(i, 1);
                        break;
                    }
                }
            }
        }
    }

}
function run(e) {
    e.target = e.srcElement;
    e.pageX = (document.documentElement.scrollLeft || document.body.scrollLeft) + e.clientX;
    e.pageY = (document.documentElement.scrollTop || document.body.scrollTop) + e.clientY;
    e.preventDefault = function () {
        e.returnValue = false;
    }
    e.stopPropagation = function () {
        e.cancelBubble = false;
    }
    var events = this[e.type + "Event"];
    if (events && events.length) {
        for (var i = 0, len = events.length; i < len; i++) {
            if (typeof events[i] == "function") {
                events[i].call(this, e);
            }
        }
    }


}
function fire(ele, type, e) {
    var events = ele[type + "Event"];
    if (events && events.length) {
        for (var i = 0, len = events.length; i < len; i++) {
            if (typeof events[i] == "function") {
                events[i].call(ele, e);
            }
        }
    }
}