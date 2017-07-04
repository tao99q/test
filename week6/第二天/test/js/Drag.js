/**
 * Created by Administrator on 2017/6/5.
 */
function EventEmitter() {

}
EventEmitter.prototype.on = function (type, fn, bool) {
    if (/^self/.test(type)) {
        if (!this[type + "Event"]) {
            this[type + "Event"] = [];
        }
        var events = this[type + "Event"];
        if (events && events.length) {
            for (var i = 0, len = events.length; i < len; i++) {
                if (events[i] == fn) {
                    return this;
                }
            }
        }
        events.push(fn);
    } else {
        if (this.addEventListener) {
            bool = bool || false;
            this.addEventListener(type, fn, bool);
        } else {
            if (!this[type + "Event"]) {
                this[type + "Event"] = [];
                this.attachEvent("on" + type, function () {
                    e = window.event;
                    run.call(this, e);
                })
            }
            var events = this[type + "Event"];
            if (events && events.length) {
                for (var i = 0, len = events.length; i < len; i++) {
                    if (events[i] == fn) {
                        return this;
                    }
                }
            }
            events.push(fn);
        }
    }
    return this;
};
EventEmitter.prototype.off = function (type, fn, bool) {
    if (/^self/.test(type)) {
        var events = this[type + "Event"];
        if (events && events.length) {
            for (var i = 0, len = events.length; i < len; i++) {
                if (events[i] == fn) {
                    events.splice(i, 1);
                    break;
                }
            }
        }
    } else {
        if (this.removeEventListener) {
            bool = bool || false;
            this.removeEventListener(type, fn, bool);
        } else {
            var events = this[type + "Event"];
            if (events && events.length) {
                for (var i = 0, len = events.length; i < len; i++) {
                    if (events[i] == fn) {
                        events.splice(i, 1);
                        break;
                    }
                }
            }
        }
    }
    return this;
};

EventEmitter.prototype.fire = function (type, e) {
    var events = this[type + "Event"];
    if (events && events.length) {
        for (var i = 0, len = events.length; i < len; i++) {
            if (typeof events[i] == "function") {
                events[i].call(this, e);
            }
        }
    }
    return this;
}


function Drag(ele) {
    this.ele = ele;
    var _this = this;
    this._down = function (e) {
        _this.down.call(_this, e);
    }
    this._move = function (e) {
        _this.move.call(_this, e);
    }
    this._up = function (e) {
        _this.up.call(_this,e);
    }
    on(this.ele, "mousedown", this._down);
}
Drag.prototype = new EventEmitter();

Drag.prototype.constructor = Drag;
/**
 * 鼠标按下
 * @param e
 */
Drag.prototype.down = function (e) {
    //1.记录鼠标在元素中的位置
    this.x = e.clientX - this.ele.offsetLeft;
    this.y = e.clientY - this.ele.offsetTop;

    //2.绑定鼠标在窗口中的事件
    on(document, "mousemove", this._move);
    on(document, "mouseup", this._up);
    e.preventDefault();
    //3.执行鼠标按下时自定义事件
    this.fire("selfDown", e);

}
/**
 * 鼠标移动
 * @param e
 */
Drag.prototype.move = function (e) {
    //1.元素跟随鼠标移动
    this.ele.style.left = (e.clientX - this.x) + "px";
    this.ele.style.top = (e.clientY - this.y) + "px";
    //2.执行鼠标移动时自定义事件
    this.fire("selfMove", e);
}

/**
 * 鼠标释放
 */
Drag.prototype.up = function () {
    off(document, "mousemove", this._move);
    off(document, "mouseup", this._up);
    this.fire("selfUp");
}