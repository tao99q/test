/**
 * Created by zhanghongtao on 2017/5/20.
 */
var oUls = document.getElementsByTagName("ul");
var ulAry = public.toArray(oUls);
function allLoad() {
    for (var i=0;i<40;i++){
        ulAry.sort(function (a,b) {
            return public.css(a,"height") - public.css(b,"height");
        })
        var li = createLi();
        ulAry[0].appendChild(li);
    }
}
allLoad();
function createLi() {
    var li = document.createElement("li");
    var img = document.createElement("img");
    var p = document.createElement("p");

    public.css(li,"height",public.getRandom(200,400));
    img.src = "img/"+public.getRandom(1,33) +".jpg";
    p.innerHTML = "收藏~";
    fadeIn.call(img);
    li.appendChild(img);
    li.appendChild(p);
    return li;
}
window.onscroll = function () {
    var st = public.win("scrollTop");
    var _H = public.win("scrollHeight");
    var _h = public.win("clientHeight");
    if (st > _H - _h * 1.5) {
        allLoad();
    }
}
function fadeIn() {
    var _this = this;
    this.timer = window.setInterval(function () {
        var opacity = public.css(_this,"opacity");
        if (opacity>=1){
            window.clearInterval(_this.timer);
            public.css(_this,"opacity",1);
            return;
        }
        public.css(_this,"opacity",opacity += 0.1);
    },17)
}