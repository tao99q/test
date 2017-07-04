/**
 * Created by zhanghongtao on 2017/6/3.
 */
//基于EventTarget原型的事件库封装
//绑定事件
EventTarget.prototype.on = function (type, callback, bool) {
    if (this.addEventListener) {
        bool = bool || false;
        this.addEventListener(type, callback, bool)
    } else {
        var _this = this;
        if (!this[type + "Event"]) {
            this[type + "Event"] = [];
            this.attachEvent("on" + type, function () {
                e = window.event;
                run.call(_this, e)
            })
        }
        var Event = this[type + "Event"];
        if (Event && Event.length) {
            for (var i = 0, len = Event.length; i < len; i++) {
                if (Event[i] == callback)return;
            }

        }
        Event.push(callback);
    }
}
//移除事件
EventTarget.prototype.off = function (type, callback, bool) {
    if (this.removeEventListener) {
        bool = bool || false;
        this.removeEventListener(type, callback, bool);
    } else {
        var Event = this[e.type + "Event"];
        if (Event && Event.length) {
            for (var i = 0, len = Event.length; i < len; i++) {
                if (Event[i] == callback) {
                    Event[i].splice(i, 1);
                    break;
                }
            }

        }
    }
}
//执行事件
EventTarget.prototype.run = function () {
    e.target = e.srcElement;
    e.pageX = (document.documentElement.scrollLeft || document.body.scrollLeft) + e.clientX;
    e.pageY = (document.documentElement.scrollTop || document.body.scrollTop) + e.clientY;
    //阻止浏览器默认行为
    e.preventDefault = function () {
        e.returnValue = false;
    }
    //阻止冒泡
    e.stopPropagation = function () {
        e.cancelBubble = false;
    }
    var Event = this[e.type + "Event"];
    if (Event && Event.length) {
        for (var i = 0, len = Event.length; i < len; i++) {
            if (typeof Event[i] == "function") {
                Event[i].call(this, e);
            }
        }

    }
}
