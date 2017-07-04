/**
 * Created by Yancy on 2017/5/18.
 */
var oUls = document.getElementsByTagName("ul");
var ulAry = oUls = public.toArray(oUls);
function appendToUl() {
    for (var i = 0; i < 40; i++) {
        ulAry.sort(function (a, b) {
            return public.css(a, "height") - public.css(b, "height");
        })
        var li = createLi();
        ulAry[0].appendChild(li);
    }
}
appendToUl();
//创建li
function createLi() {
    var li = document.createElement("li");
    var img = document.createElement("img");
    var p = document.createElement("p");

    public.css(li, "height", public.getRandom(250, 500));
    img.src = "img/" + public.getRandom(1, 33) + ".jpg";
    fadeIn.call(img);

    p.innerHTML = "收藏吧~";
    li.appendChild(img);
    li.appendChild(p);
    return li


}

function fadeIn() {
    var _this = this;
    this.timer = window.setInterval(function () {
        var opacity = public.css(_this, "opacity");
        if (opacity >= 1) {
            public.css(_this, "opacity", 1);
            window.clearInterval(_this.timer);
            return;
        }
        public.css(_this, "opacity", opacity += 0.1);
    }, 10);
}

window.onscroll = function () {
    var st = public.win("scrollTop");
    var _h = public.win("clientHeight");
    var _H = public.win("scrollHeight");
    if (st > _H - _h * 1.1) {
        appendToUl();
    }

}