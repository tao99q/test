/**
 * Created by zhanghongtao on 2017/6/4.
 */
//布局由浮动float 改为定位
//
var oLis = document.getElementsByTagName("li");
for (var i = oLis.length - 1; i >= 0; i--) {
    oLis[i].style.left = (oLis[i].l = oLis[i].offsetLeft ) + "px";
    oLis[i].style.top = (oLis[i].t = oLis[i].offsetTop) + "px";
    oLis[i].style.position = "absolute";
    oLis[i].style.margin = 0;
    new Drag(oLis[i]).on("selfDown", addZIndex).on("selfMove", touchChange).on("selfUp", changePos);
}

//按下去的时候层级关系变大
function addZIndex() {
    this.ele.style.zIndex = 10;
}

//拖动时，判断是否和其它li发生碰撞
function isTouch(cur, other) {
    if (cur.offsetLeft + cur.offsetWidth < other.offsetLeft || cur.offsetLeft > other.offsetLeft + other.offsetWidth || cur.offsetTop + cur.offsetHeight < other.offsetTop || cur.offsetTop > other.offsetTop + other.offsetHeight) {
        return false;
    } else {
        return true;
    }

}

//让发生碰撞的元素变成红色
function touchChange() {
    //创建一个数组，把所有发生碰撞的元素存起来，方便面交换位置
    this.touchAry = [];
    for (var i = 0; i < oLis.length; i++) {
        if (oLis[i] == this.ele)continue;
        if (isTouch(this.ele, oLis[i])) {
            oLis[i].style.backgroundColor = "red";
            this.touchAry.push(oLis[i]);
        } else {
            oLis[i].style.backgroundColor = null;
        }
    }
    // this.touchAry = [].slice.call(this.touchAry);
    // this.touchAry =  this.touchAry.sort(function (a,b) {
    //     var s1 = Math.abs((a.offsetTop- this.ele.offsetTop) +( a.offsetLeft -this.ele.offsetLeft));
    //     var s2 =  Math.abs((b.offsetTop- this.ele.offsetTop) +( b.offsetLeft -this.ele.offsetLeft));
    //     return s1-s2;
    // })
    // console.log(this.touchAry[0].offsetLeft,this.touchAry[0].offsetTop);
}

function changePos() {
    var a = this.touchAry;
    if (a && a.length) {
        //先把每一个元素距离当前拖拽的元素求出来，存在每个元素的自定义属性上
        for (var i = 0; i < a.length; i++) {
            a[i].distance = Math.sqrt(Math.pow(this.ele.offsetTop - a[i].offsetTop, 2) + Math.pow(a[i].offsetLeft - this.ele.offsetLeft, 2));
            // a[i].distance = Math.abs((a[i].offsetTop- this.ele.offsetTop) +( a[i].offsetLeft -this.ele.offsetLeft));
            a[i].style.backgroundColor = null;
        }
        a.sort(function (a, b) {
            return a.distance - b.distance;
        });
        animation(this.ele, {left: a[0].l, top: a[0].t}, 200, 5);
        animation(a[0], {left: this.ele.l, top: this.ele.t}, 200, 5);
        var l = this.ele.l;
        var t = this.ele.t;
        this.ele.l = a[0].l;
        this.ele.t = a[0].t;
        this.ele.style.zIndex = "0";
        a[0].l = l;
        a[0].t = t;

        this.touchAry = null;
    } else {
        animation(this.ele, {left: this.ele.l, top: this.ele.t}, 200, 5);
    }

}