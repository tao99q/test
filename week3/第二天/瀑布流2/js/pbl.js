/**
 * Created by zhanghongtao on 2017/5/14.
 */


var ul = document.getElementById("box");

function appendToUl() {

    var _W = public.win("clientWidth");


    var height = public.getRandom(180, 210);

    var li = createLi(height);
    var _w = public.css(li, "width");


    var i = 0;
    while (i < 10) {
        console.log(_w);
        ul.appendChild(li);
        li = createLi(height);
        _w += public.css(li, "width");
        i++;
        console.log(_w);
    }
    // for (var j=0;j<10;j++){
    //
    //     div.appendChild(ul);
    //
    //
    //     li = createLi(height);
    //     _w += public.css(li,"width");
    //
    //     ul.appendChild(li);
    // }



}
appendToUl();
window.onscroll = function () {

    var st = public.win("scrollTop");
    var _h = public.win("clientHeight");
    var _H = public.win("scrollHeight");
    if (st > _H - _h * 1.5) {
        appendToUl();
    }
}
//创建li的方法
function createLi(height) {
    var li = document.createElement("li");
    var div = document.createElement("div");
    var img = document.createElement("img");
    var p = document.createElement("p");

    public.css(li, "height", height);
    public.css(li, "width", public.getRandom(250, 300));
    img.src = "img/" + public.getRandom(1, 33) + ".jpg";
    p.innerHTML = "收藏吧~";

    div.appendChild(img);
    div.appendChild(p);
    li.appendChild(div);
    fadeIn(img);

    return li;
}

function fadeIn(ele) {
    ele.timer = window.setInterval(function () {
        var _opactiy = public.css(ele, "opacity");
        if (_opactiy >= 1) {
            public.css(ele, "opacity", 1);
            window.clearInterval(ele.timer);
            return;
        }
        public.css(ele, "opacity", _opactiy += 0.01);
    }, 10);

}