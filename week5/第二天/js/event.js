/**
 * Created by zhanghongtao on 2017/5/29.
 */
function on(ele, type, callback, bool) {
    //ele当前元素，type:事件类型 callback:绑定的函数,bool：执行事件阶段
    bool = bool || false;
    if (ele.addEventListener) {
        ele.addEventListener(type, callback, bool);
    } else {
        alert("ie");
        if (!ele[type + "Event"]) {
            ele[type + "Event"] = [];
            ele.attachEvent("on" + type, function () {
                run.call(ele);
            })
        }
        var typeAry = ele[type + "Event"];
        if (typeAry && typeAry.length) {
            for (var i = 0; i < typeAry.length; i++) {
                if (typeAry[i] == callback)return;
            }
        }
        typeAry.push(callback);
    }

}
function off(ele, type, callback, bool) {
    bool = bool || false;
    if (ele.removeEventListener) {
        ele.removeEventListener(type, callback, bool);
    } else {
        var typeAry = ele[type + "Event"];
        if (typeAry && typeAry.length) {
            for (var i = 0; i, typeAry.length; i++) {
                if (typeAry[i] == callback) {
                    typeAry.splice(i, 1);
                    ele.detachEvent("on" + type, callback);
                    break;
                }
            }
        }
    }
}
function run(e) {
    //事件对象也存在兼容性，在低版本浏览器中，不会给函数传参数，事件对象存在window.event中
    //e = window.event this = ele
    e = e || window.event;
    //e.target 事件源存在兼容性
    e.target = e.target || e.srcElement;

    //阻止默认行为在IE下没有preventDefault()，使用e.returnValue

    e.preventDefault = function () {
        e.returnValue = false;
    }
    //阻止冒泡
    e.stopPropagation = function () {
        e.cancelBubble = true;
    }
    //pageX , pageY 在低版本浏览器中没有
    e.pageX = (document.documentElement.scrollLeft || document.body.scrollLeft) + e.clientX;
    e.pageY = (document.documentElement.scrollTop || document.body.scrollTop) + e.clientY;
    var typeAry = this[e.type + "Event"];
    if (typeAry && typeAry.length) {
        for (var i = 0; i < typeAry.length; i++) {
            if (typeof typeAry[i] == "function") {
                typeAry[i].call(this, e);
            }
        }
    }

}