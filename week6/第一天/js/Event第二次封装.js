/**
 * Created by zhanghongtao on 2017/6/3.
 */
function on(ele, type, callback, bool) {
    //"selfdown"
    //if(/^self/.test(type)){}
    //if(ele["on"+type]){}
    if (/^self/.test(type)) {
        //自定义事件
        if (!ele[type + "Event"]) {
            ele[type + "Event"] = [];
        }
        var selfEvent = ele[type + "Event"];
        if (selfEvent && selfEvent.length) {
            for (var i = 0, len = selfEvent.length; i < len; i++) {
                if (selfEvent[i] == callback)return;
            }
        }
        selfEvent.push(callback);
    } else {
        if (ele.addEventListener) {
            //标准浏览器
            bool = bool || false;
            ele.addEventListener(type, callback, bool);
        } else {
            //低版本浏览器
            if (!ele[type + "Event"]) {
                ele[type + "Event"] = null;
                ele.attachEvent("on" + type, function () {
                    e = window.event;
                    run.call(ele, e);
                })

            }
            var event = ele[type + "Event"];
            if (event && event.length) {
                for (var i = 0, len = event.length; i < len; i++) {
                    if (event[i] == callback)return;
                }
            }
            event.push(callback);
        }
    }
}
function off(ele, type, callback, bool) {
    if (/^self/.test(type)) {
        //自定义事件
        var selfEvent = ele[type] + "Event";
        if (selfEvent && selfEvent.length) {
            for (var i = 0, len = selfEvent.length; i < len; i++) {
                if (selfEvent[i] == callback) {
                    selfEvent.splice(i, 1);
                    break;
                }
            }
        }
    } else {
        if (ele.removeEventListener) {
            //标准浏览器
            ele.removeEventListener(type, callback, bool);
        } else {
            //低版本
            var event = ele[type + "Event"];
            if (event && event.length) {
                for (var i = 0, len = event.length; i < len; i++) {
                    if (event[i] == callback) {
                        event.splice(i, 1);
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
    var event = this[e.type + "Event"];
    if (event && event.length) {
        for (var i = 0, len = event.length; i < len; i++) {
            if (typeof event[i] == "function") {
                event[i].call(this, e);
            }
        }
    }

}
function fire(ele, type, e) {
    var selfEvent = ele[type + "Event"];
    if (selfEvent && selfEvent.length) {
        for (var i = 0, len = selfEvent.length; i < len; i++) {
            if (typeof selfEvent[i] == "function") {
                selfEvent[i].call(ele, e);
            }
        }
    }
}
function changeThis(fn, context, e) {
    return fn.call(context, e);
}

function f1() {
    console.log(this);
}
var obj = {a: 1};
on(obj, "selfeat", f1);
fire(obj, "selfeat");