/**
 * Created by zhanghongtao on 2017/5/14.
 */

var oUls = document.getElementsByTagName("ul");
var oUlAry = public.toArray(oUls);

function appendToUl() {
    for (var i = 0; i < 40; i++) {
        oUlAry.sort(function (a, b) {
            return public.css(a, "height") - public.css(b, "height");
        })
        var li = createLi();
        oUlAry[0].appendChild(li)
    }
}
appendToUl();
window.onscroll = function () {

    var st = public.win("scrollTop");
    var _h = public.win("clientHeight");
    var _H = public.win("scrollHeight");
    if (st > _H - _h * 1.1) {
        appendToUl();
    }
}
//创建li的方法
function createLi() {
    var li = document.createElement("li");
    var img = document.createElement("img");
    var p = document.createElement("p");

    public.css(li, "height", public.getRandom(250, 500));
    img.src = "img/" + public.getRandom(1, 33) + ".jpg";
    p.innerHTML = "收藏吧~";
    li.appendChild(img);
    li.appendChild(p);
    fadeIn(img);
    return li;
}

function fadeIn(ele) {
    ele.timer = window.setInterval(function () {
        var _opactiy = public.css(ele,"opacity");
        if (_opactiy>=1){
            public.css(ele,"opacity",1);
            window.clearInterval(ele.timer);
            return;
        }
        public.css(ele,"opacity",_opactiy+=0.01);
    },10);

}