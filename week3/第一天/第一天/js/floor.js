/**
 * Created by zhanghongtao on 2017/5/13.
 */
var oDivs = document.getElementsByTagName("div");
var floor = document.getElementsByClassName("floor")[0];
var oLis = floor.getElementsByTagName("li");
var timer = null;
var map = {};
for (var i=0;i<oDivs.length;i++){
    var bg = "rgb("+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+")";

    oDivs[i].style.height = Math.round(Math.random()*(600-400)+400)+"px";
    oDivs[i].style.backgroundColor = bg;

    oLis[i].setAttribute("_h",offset(oDivs[i]).top);
    oLis[i].setAttribute("bg",bg);
    map[offset(oDivs[i]).top] = oLis[i];
    oLis[i].onclick = function () {
        select(this);
        window.onscroll = null;
        window.clearInterval(timer);
        //判断当前的scrollTop值跟当前点击的li存储的那个偏移量比较
        //如果大的话scrollTop减小，反之增加
        //实现不断在增加和减小用到定时器
        //到达临界值清掉定时器
        var _H = win("scrollTop");
        var _h = this.getAttribute("_h");
        if(_H>_h){
            timer = window.setInterval(function () {
                if (win("scrollTop")<=_h){
                    window.clearInterval(timer);
                    window.onscroll = onFloor;
                    return;
                }
                win("scrollTop",_H-=10);
            },1);
        }else{
            timer = window.setInterval(function () {
                if (win("scrollTop")>=_h){
                    window.clearInterval(timer);
                    window.onscroll = onFloor;
                    return;
                }
                win("scrollTop",_H+=10);
            },1);
        }

    }
    // oLis[i].onmousemove = function (){
    //
    //     this.style.backgroundColor = this.getAttribute("bg");
    //     this.style.color = "#fff";
    //     this.style.webkitTransform = "scale(1.1)";
    // }
    // oLis[i].onmouseout = function (){
    //     for (var i=0;i<oLis.length-1;i++){
    //         // oLis[i].className = "";
    //         oLis[i].style.backgroundColor = "#fff";
    //         oLis[i].style.color = "#000";
    //         oLis[i].style.webkitTransform = "scale(1)";
    //     }
    // }

}
oLis[oLis.length-1].setAttribute("_h",0);
oLis[oLis.length-1].setAttribute("bg","red");
oLis[oLis.length-1].onclick = function () {
    window.clearInterval(timer);
    for (var i=0;i<oLis.length;i++){
        oLis[i].className = "";
    }
    var _H = win("scrollTop");
    window.onscroll = null;
    timer = window.setInterval(function () {
        if (win("scrollTop")<=0){
            window.clearInterval(timer);
            window.onscroll = onFloor;
            return;
        }
        win("scrollTop",_H-=10);
    },1);
}
function select(ele) {
    for (var i=0;i<oLis.length-1;i++){
        oLis[i].className = "";
        // oLis[i].style.backgroundColor = "#fff";
        // oLis[i].style.color = "#000";
        // oLis[i].style.webkitTransform = "scale(1)";
    }
    // ele.style.backgroundColor = ele.getAttribute("bg");
    // ele.style.color = "#fff";
    // ele.style.webkitTransform = "scale(1.1)";
    ele.className = "select";

}

function win(attr,value) {
    if (arguments.length ===1){
        return document.documentElement[attr]||document.body[attr];
    }else{
        document.documentElement[attr] = value;
        document.body[attr] = value;
    }

}

function offset(curEle) {
    //先求一次当前元素的偏移量和父级参照物
    var t = curEle.offsetTop;
    var l = curEle.offsetLeft;
    var p = curEle.offsetParent;
    while (p){
        //在IE8浏览器中，偏移量包含了父级参照物的边框
        if(window.navigator.userAgent.indexOf("MSIE 8") === -1){
            l+= p.clientLeft;//加上父级参照物的左边框
            t+= p.clientTop;//加上父级参照物的上边框
        }
        l+= p.offsetLeft;//加上当前元素距离父级参照物的左偏移量
        t+= p.offsetTop;//加上当前元素距离父级参照物的上偏移量
        p = p.offsetParent;
    }


    return {
        left:l,
        top:t
    }

}

window.onscroll = onFloor;

function onFloor() {

    var _H2 = Math.floor(win("clientHeight")/2);
    for (var i=0;i<oLis.length-1;i++){
        var _H = win("scrollTop");
        var _t1 =oLis[i].getAttribute("_h");
        var _t2 = oLis[i+1].getAttribute("_h");
        if (_t1 - _H2 <= _H && _H <= _t2-_H2){

            select(oLis[i]);
            continue;

        }
        if (oLis[8].getAttribute("_h")-_H2 <=_H){
            select(oLis[8]);
            continue;
        }
    }
}