/**
 * Created by Yancy on 2017/5/15.
 */
var oUls = document.getElementsByTagName("ul");
var oUlAry = public.toArray(oUls);
//加载图片
function appendToUl() {
    for (var i = 0; i < 40; i++) {
        oUlAry.sort(function (a, b) {
            return public.css(a, "height") - public.css(b, "height");
        });
        console.log(public.css(oUlAry[0], "height"));
        var li = createLi();
        oUlAry[0].appendChild(li);
    }
}
appendToUl();
//创建图片框
function createLi() {
    var li = document.createElement("li");
    var img = document.createElement("img");
    img.src = "img/" + public.getRandom(1, 33) + ".jpg";
    public.css(li, "height", public.getRandom(200, 400));
    li.appendChild(img);
    fadeIn(img);
    return li;
}
//滚动时判断是否加载图片
window.onscroll = function () {
    var st = public.win("scrollTop");//滚动的距离
    var _h = public.win("clientHeight");//屏幕高度
    var _H = public.win("offsetHeight");//真实内容的高度
    if (st > _H - _h * 1.5) {
        appendToUl();
    }
}
//逐渐显示图片
function fadeIn(ele) {
    ele.timer = window.setInterval(function () {
        var _opacity = public.css(ele, "opacity");
        if (_opacity >= 1) {
            window.clearInterval(ele.timer);
            public.css(ele, "opacity", 1);
            return;
        }
        public.css(ele, "opacity", _opacity += 0.01);
    }, 10);
}
