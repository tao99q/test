/**
 * Created by zhanghongtao on 2017/6/3.
 */
var box = document.getElementById("box");
box.on("mousedown", down, false);

function down(e) {
    this.startX = e.clientX - this.offsetLeft;
    this.startY = e.clientY - this.offsetTop;
    this.minL = this.minT = 0;
    this.maxL = this.parentNode.offsetWidth - this.offsetWidth;
    this.maxT = this.parentNode.offsetHeight - this.offsetHeight;
    var _this = box;
    this._move = function (e) {
        move.call(_this, e);
    }
    this._up = function () {
        up.call(_this)
    }

    border.call(this);
    window.clearTimeout(this.fryTimer);
    window.clearTimeout(this.dropTimer);

    document.on("mousemove", this._move);
    document.on("mouseup", this._up);


}
function move(e) {

    var l = e.clientX - this.startX;
    var t = e.clientY - this.startY;
    l = l < this.minL ? this.minL : (l > this.maxL ? this.maxL : l);
    t = t < this.minT ? this.minT : (t > this.maxT ? this.maxT : t);
    this.style.left = l + "px";
    this.style.top = t + "px";
    //每一次执行move会有一个时间差，记录当前鼠标的位置和上一次的位置差，代表水平的速度
    if (!this.prevSpeedX) {
        this.prevSpeedX = e.clientX;
    } else {
        this.speedX = e.clientX - this.prevSpeedX;
        this.prevSpeedX = e.clientX;
    }
    e.preventDefault();


}
function up() {
    this.style.border = "";
    document.off("mousemove", this._move);
    document.off("mouseup", this._up);
    drop.call(this);
    fry.call(this);
}
var flag = 0;
function drop() {
    window.clearTimeout(this.dropTimer);
    var _this = this;
    if (!this.speedY) {
        this.speedY = 9.8;
    } else {
        this.speedY += 9.8;
    }
    var l = this.speedY + this.offsetTop;
    this.speedY *= 0.98;
    if (l >= this.maxT) {
        l = this.maxT;
        this.speedY *= -1;
        flag++;
    } else {
        flag = 0;
    }
    this.style.top = l + "px";
    if (flag < 2) {
        this.dropTimer = window.setTimeout(function () {
            drop.call(_this);
        }, 20);
    }

}
function fry() {
    window.clearTimeout(this.fryTimer);
    var _this = this;
    if (!this.speedX) {
        this.speedX = 0;
    } else {
        this.speedX *= 0.98;
        var l = this.offsetLeft + this.speedX;
    }

    if (l > this.maxL) {
        l = this.maxL
        this.speedX *= -1;
    } else if (l < this.minL) {
        l = this.minL
        this.speedX *= -1;
    }
    this.style.left = l + "px";
    if (Math.abs(this.speedX) >= 0.5) {
        this.fryTimer = window.setTimeout(function () {
            fry.call(_this);
        }, 20);
    }

}
function border() {
    this.style.border = "1px dashed red "
}