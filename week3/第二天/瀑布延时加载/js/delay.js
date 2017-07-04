/**
 * Created by Yancy on 2017/5/15.
 */
var xhr = new XMLHttpRequest();
xhr.open("GET", "js/data.txt", false);
var dataAry = null;
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        dataAry = public.toJsonObj(xhr.responseText);
    }
}
xhr.send(null);
var htmlStr = ``;
var news = document.getElementById("news");
for (var i = 0; i < dataAry.length; i++) {
    htmlStr += `
    <li>
        <div>
            <img src="" data-src="${dataAry[i].src}">
        </div>
        <div>
            <h2>${dataAry[i].title}</h2>
            <p>${dataAry[i].desc}</p>
        </div>
    </li>
    `;
}
news.innerHTML = htmlStr;

function delayLoad() {
    var _this = this;
    if (_this.isLoad){
        return;
    }
    var _H = public.win("clientHeight") + public.win("scrollTop");
    var _h = this.parentNode.offsetHeight + public.offset(this.parentNode).top;
    if (_H > _h) {
        _this.isLoad = true;
        var img = document.createElement("img");
        img.src = this.getAttribute("data-src");
        img.onload = function () {
            _this.src = this.src;
            fadeIn.call(_this);
        }
    }
}
window.onscroll = allLoad;
function allLoad() {
    var imgList = news.getElementsByTagName("img");
    for (var i = 0; i < imgList.length; i++) {
        imgList[i].isLoad = false;
        delayLoad.call(imgList[i]);
    }
}
allLoad();

function fadeIn() {
    var _this = this;

    _this.timer = window.setInterval(function () {
        var _optcity = public.css(_this,"opacity");
        if (_optcity>=1){
            window.clearInterval(_this.timer);
            public.css(_this,"opacity",1);
            return;
        }
        public.css(_this,"opacity",_optcity += 0.01);
    },17)
}
