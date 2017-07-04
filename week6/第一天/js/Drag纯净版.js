/**
 * Created by zhanghongtao on 2017/6/3.
 */
/**
 * 面向对象版的订阅发布(自定义事件)
 */
//创建一个EventEmitter类
function EventEmitter() {

}
//自定义事件
//订阅 自定义事件的绑定
EventEmitter.prototype.on = function (type, fn) {
    //this 实例
    if (!this[type + "Event"]) {
        //1.把所有跟该行为有关的函数方法放到一个数组中，这个数组存在这个实例的自定义属性type+"Event"上
        this[type + "Event"] = [];
    }
    //2. 根据传进来的类型type，找到对应的数组
    var event = this[type + "Event"];
    if (event && event.length) {
        for (var i = 0, len = event.length; i < len; i++) {
            //添加前判断，如果数组中有了fn,直接return
            if (event[i] == fn) return;
        }
    }
    //3.如果能执行到这，说明数组中没有fn,push到数组中
    event.push(fn);
}
EventEmitter.prototype.off = function (type, fn, bool) {
    //1.根据传进来的type，获取对应的自定义事件的数组
    var event = this[type + "Event"];
    //自event.length>0时
    if (event && event.length) {
        for (var i = 0, len = event.length; i < len; i++) {
            if (event[i] == fn) {
                event.splice(i, 1);
                break;
            }
        }
    }
}
EventEmitter.prototype.fire = function (type) {
    var event = this[type + "Event"];
    if (event && event.length) {
        for (var i = 0, len = event.length; i < len; i++) {
            if (typeof event[i] == "function") {
                event[i].call(this);
            }
        }
    }
}

//Drag.prototype.__proto__ = EventEmitter.prototype
Drag.prototype = new EventEmitter();
//原来constructor没有了
Drag.prototype.constructor = Drag;
/**
 * 面向对象版的拖拽
 * @constructor
 */
//Drag的实例.__proto__.__proto__ = EventEmitter.prototype
function Drag(ele) {
    //ele被拖拽的元素
    this.ele = ele;
    this.x = this.y = this.maxL = this.maxT = null;
    // on(this.ele,"mousedown",this.down)
    //把down中的this变成当前实例
    var _this = this;
    this._down = function (e) {
        _this.down.call(_this, e);
    }
    var _this = this;
    this._move = function (e) {
        _this.move.call(_this, e);
    }
    this._up = function (e) {
        _this.up.call(_this, e);
    }

    on(this.ele, "mousedown", this._down);
}

Drag.prototype.down = function (e) {
    //this 就是当前实例，this.ele是被拖拽的元素
    this.ele.style.zIndex = 10;
    this.x = e.clientX - this.ele.offsetLeft;
    this.y = e.clientY - this.ele.offsetTop;

    this.maxL = this.ele.parentNode.offsetWidth - this.ele.offsetWidth;
    this.maxT = this.ele.parentNode.offsetHeight - this.ele.offsetHeight;
    on(document, "mousemove", this._move);
    on(document, "mouseup", this._up);
    e.preventDefault();


}
Drag.prototype.move = function (e) {
    var l = e.clientX - this.x;
    var t = e.clientY - this.y;
    console.log(l, t);
    l = l < 0 ? 0 : (l > this.maxL ? this.maxL : l);
    t = t < 0 ? 0 : (t > this.maxT ? this.maxT : t);
    this.ele.style.left = l + "px";
    this.ele.style.top = t + "px";
}
Drag.prototype.up = function (e) {
    off(document, "mousemove", this._move);
    off(document, "mouseup", this._up);
}