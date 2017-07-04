/**
 * Created by zhanghongtao on 2017/5/20.
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
var news = document.getElementById("news");
var htmlStr = ``;
for (var i = 0; i < dataAry.length; i++) {
    htmlStr += `
        <li>
        <div><img src="" alt="" data-src="${dataAry[i].src}"></div>
        <div>
        <h2>${dataAry[i].title}</h2>
        <p>${dataAry[i].desc}</p>
        </div>
</li>
    `;
}
news.innerHTML = htmlStr;

function delayLoad(){
    var _this = this;
    if (this.isLoad) {
        return;
    }
    var _H = public.win("scrollTop") + public.win("clientHeight");
    var _h = this.offsetHeight + public.offset(this).top;
    if (_H > _h) {
        this.isLoad = true;
        var curImg = document.createElement("img");
        curImg.src = this.getAttribute("data-src");
        curImg.onload = function () {
            _this.src = this.src;
            fadeIn.call(_this);
        }
    }


}
function allLoad() {
    var imgList = document.getElementsByTagName("img");
    for (var i=0;i<imgList.length;i++){
        imgList[i].isLoad = false;
        delayLoad.call(imgList[i]);
    }
}
allLoad();
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
window.onscroll=allLoad;