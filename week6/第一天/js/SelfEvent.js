/**
 * Created by zhanghongtao on 2017/6/3.
 */
/**
 * 自定义事件
 * 相当于自定义属性，浏览器不认识，不会自动触发，只能手动触发(浏览器就不会传一个事件对象)，就写一个fire这个方法来触发自定义事件
 * 自定义事件也是需要绑定方法，用on方法来绑定，
 * 自定义事件中绑定方法也是可以移除的，用off方法移除
 *
 * 自定义事件的这几个方法不仅仅是某个对象可以使用，通过对象.on()或对象.off(),对象.fire(),如果是私有属性，每一个对象都需要加上这三个属性，这样就失去意义了，所以我们把它当做公有属性，那就写在某个类的原型上
 *
 */

function EventSelf() {

}
EventSelf.prototype.on = function (type, callback) {
    //this 实例
    if (!this[type + "Self"]) {
        this[type + "Self"] = [];
    }
    var selfEvent = this[type + "Self"];
    if (selfEvent && selfEvent.length) {
        for (var i = 0, len = selfEvent.length; i < len; i++) {
            if (selfEvent[i] == callback)return;
        }
    }
    selfEvent.push(callback);
}
EventSelf.prototype.off = function (type, callback) {
    var selfEvent = this[type + "Self"];
    if (selfEvent && selfEvent.length) {
        for (var i = 0, len = selfEvent.length; i < len; i++) {
            if (selfEvent[i] == callback) {
                selfEvent.splice(i, 1);
                break;
            }
        }
    }
}
EventSelf.prototype.fire = function (type) {
    var selfEvent = this[type + "Self"];
    if (selfEvent && selfEvent.length) {
        for (var i = 0, len = selfEvent.length; i < len; i++) {
            if (typeof selfEvent[i] == "function") {
                selfEvent[i].call(this);
            }
        }
    }
}

var obj = new EventSelf();
function f1() {
    console.log(this);
    console.log("aaaaaaaa");
}
function changeThis(fn, context, e) {
    return fn.call(context, e);
}
// obj.on("eat", f1);
// console.log(obj);
// obj.fire("eat", f1);
// console.log(obj);
