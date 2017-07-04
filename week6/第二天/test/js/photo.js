/**
 * Created by Administrator on 2017/6/5.
 */
var oLis = document.getElementsByTagName("li");

//布局由浮动float 改为定位
for (var i = oLis.length - 1; i >= 0; i--) {
    oLis[i].style.left = (oLis[i].l = oLis[i].offsetLeft) + "px";
    oLis[i].style.top = (oLis[i].t = oLis[i].offsetTop) + "px";
    oLis[i].style.position = "absolute";
    oLis[i].style.margin = 0;
    new Drag(oLis[i]).on("selfDown", addZIndex).on("selfMove", touchChange).on("selfUp", changePos);

}

function addZIndex() {

    this.ele.style.zIndex = "10";
}

//让发生碰撞的元素变成红色
function touchChange() {
    this.touchAry = [];
    for (var i = 0; i < oLis.length; i++) {
        if (oLis[i] == this.ele) continue;
        if (isTouch(this.ele, oLis[i])) {
            oLis[i].style.backgroundColor = "yellow";
            this.touchAry.push(oLis[i]);
        } else {
            oLis[i].style.backgroundColor = null;
        }

    }
}

function isTouch(cur, other) {
    if (cur.offsetLeft + cur.offsetWidth < other.offsetLeft || cur.offsetLeft > other.offsetLeft + other.offsetWidth || cur.offsetTop + cur.offsetHeight < other.offsetTop || cur.offsetTop > other.offsetTop + other.offsetHeight) {
        return false;
    } else {
        return true;
    }
}

function changePos() {
    var ary = this.touchAry;
    if (ary && ary.length) {
        for (var i = 0; i < ary.length; i++) {
            ary[i].distance = Math.sqrt(Math.pow(this.ele.offsetTop - ary[i].offsetTop, 2) + Math.pow(ary[i].offsetLeft - this.ele.offsetLeft, 2), 2);
            ary[i].style.backgroundColor = null;
        }
        ary.sort(function (a, b) {
            return a.distance - b.distance;
        });
        var l = this.ele.l;
        var t = this.ele.t;
        this.ele.l = ary[0].l;
        this.ele.t = ary[0].t;
        ary[0].l = l;
        ary[0].t = t;
        ary[0].style.zIndex = "5";
        animation(ary[0], {left: ary[0].l, top: ary[0].t}, 300, 5, function () {
            this.style.zIndex = "0";
        });

    }
    animation(this.ele, {left: this.ele.l, top: this.ele.t}, 300, 5, function () {
        this.style.zIndex = "0";
    });
    this.touchAry = null;
}