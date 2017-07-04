/**
 * Created by zhanghongtao on 2017/6/4.
 */
/**
 * 自定义事件类
 * @constructor
 */
function EventEmitter() {

}
EventEmitter.prototype.on = function (type, fn) {
    if (!this[type + "Event"]) {
        this[type + "Event"] = [];
    }
    var event = this[type + "Event"];
    if (event && event.length) {
        for (var i = 0, len = event.length; i < len; i++) {
            if (event[i] == fn)return;
        }
    }
    event.push(fn);
    return this;
};
EventEmitter.prototype.off = function (type, fn) {
    var event = this[type + "Event"];
    if (event && event.length) {
        for (var i = 0, len = event.length; i < len; i++) {
            if (event[i] == fn) {
                event.splice(i, 1);
                break;
            }
        }
    }
    return this;
};
EventEmitter.prototype.fire = function (type, e) {
    var event = this[type + "Event"];
    if (event && event.length) {
        for (var i = 0, len = event.length; i < len; i++) {
            if (typeof event[i] == "function") {
                event[i].call(this, e);
            }
        }
    }
    return this;
};
function Drag(ele) {
    var _this = this;
    this._down = function (e) {
        _this.down.call(_this, e);
    };
    this._move = function (e) {
        _this.move.call(_this, e);
    };
    this._up = function (e) {
        _this.up.call(_this, e);
    };
    this.ele = ele;
    this.dropTimer = null;
    this.flyTimer = null;
    this.prevSpeedX = null;
    this.speedX = null;
    on(this.ele, "mousedown", this._down);

}
Drag.prototype = new EventEmitter();
Drag.prototype.constructor = Drag;
Drag.prototype.down = function (e) {
    this.x = e.clientX - this.ele.offsetLeft;
    this.y = e.clientY - this.ele.offsetTop;

    on(document, "mousemove", this._move);
    on(document, "mouseup", this._up);
    e.preventDefault();
    this.fire("selfDown", e)
};
Drag.prototype.move = function (e) {
    this.ele.style.left = (e.clientX - this.x) + "px";
    this.ele.style.top = (e.clientY - this.x) + "px";
    this.fire("selfMove", e);
};
Drag.prototype.up = function (e) {
    off(document, "mousemove", this._move);
    off(document, "mouseup", this._up);
    this.fire("selfUp");
};
/**
 * 限定范围
 * @param objRange
 */
Drag.prototype.range = function (objRange) {
    this.objRange = objRange;
    this.on("selfMove", this.addRange);
};
Drag.prototype.addRange = function (e) {
    var l = e.clientX - this.x;
    var t = e.clientY - this.y;
    if (l <= this.objRange.minL) {
        l = this.objRange.minL;
    } else if (l > this.objRange.maxL) {
        l = this.objRange.maxL;
    }
    if (t <= this.objRange.minT) {
        t = this.objRange.minT;
    } else if (t > this.objRange.maxT) {
        t = this.objRange.maxT;
    }
    this.ele.style.left = l + "px";
    this.ele.style.top = t + "px";
}
/**
 * 设置边框
 * @param objBorder
 */
Drag.prototype.border = function () {
    this.on("selfDown", this.addBorder);
    this.on("selfUp", this.removeBorder)
}

Drag.prototype.addBorder = function (e) {
    this.img = this.ele.getElementsByTagName("img")[0];
    this.ele.removeChild(this.img);
    this.bg = window.getComputedStyle(this.ele).background;
    this.ele.style.background = "none";
    this.ele.style.border = "2px dashed red";
}
Drag.prototype.removeBorder = function (e) {
    this.ele.appendChild(this.img);
    this.ele.style.background = this.bg;
    this.ele.style.border = "none";
}
Drag.prototype.jump = function () {
    //在抓住
    this.on("selfMove", getSppeedX);
    this.on("selfDown", stopEvent);
    this.on("selfUp", drop);
    this.on("selfUp", fry);
}
var flag = 0;
function drop(e) {
    clearTimeout(this.dropTimer);
    var _this = this;
    if (!this.speedY) {
        this.speedY = 9.8;
    } else {
        this.speedY += 9.8;
    }

    // this.speedY + this.offsetTop;
    this.speedY *= 0.93;
    var t = this.ele.offsetTop + this.speedY;

    var maxT = (document.documentElement.offsetHeight || document.body.offsetHeight) - this.ele.offsetHeight;
   
    if (t >= maxT) {
        t = maxT;
        this.speedY *= -1;
        this.flg++;
    } else {
        this.flg = 0;
    }
    this.ele.style.top = t + "px";
    if (this.flg < 2) {
        this.dropTimer = window.setTimeout(function () {
            drop.call(_this);
        }, 20)
    }


}
function fry(e) {
    var _this = this;
    clearTimeout(this.flyTimer);
    this.speedX *= 0.93;
    var l = this.ele.offsetLeft + this.speedX;
    var maxL = (document.documentElement.offsetWidth || document.body.offsetWidth) - this.ele.offsetWidth;
    if (l <= 0) {
        l = 0;
        this.speedX *= -1;
    } else if (l > maxL) {
        l = maxL;
        this.speedX *= -1;
    }
    this.ele.style.left = l + "px";
    if (Math.abs(this.speedX) > 0.5) {
        this.flyTimer = window.setTimeout(function () {
            fry.call(_this);
        }, 20)
    }
}
function stopEvent() {
    clearTimeout(this.dropTimer);
    clearTimeout(this.flyTimer);
}
function getSppeedX(e) {
    if (!this.prevSpeedX) {
        this.prevSpeedX = e.clientX;
    } else {
        this.speedX = e.clientX - this.prevSpeedX;
        this.prevSpeedX = e.clientX;
    }

}
