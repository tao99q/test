/**
 * Created by zhanghongtao on 2017/5/14.
 */
//1.获取数据 ajax

var xhr = new XMLHttpRequest();
var dataAry = null;
xhr.open("GET", "js/data.txt", false);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        dataAry = public.toJsonObj(xhr.responseText);
    }
}
xhr.send(null);
// console.log(dataAry);
//2.绑定数据，使用ES6模板字符串
//图片延迟加载原理
var htmlStr = ``;
for (var i = 0; i < dataAry.length; i++) {
    htmlStr += `
    <li>
        <div>
            <img src="" data-src="${dataAry[i].src}" alt="">
        </div>
        <div>
            <h2>${dataAry[i].title}</h2>
            <p>${dataAry[i].desc}</p>
        </div>
        
    </li>   
    `;
}

var news = document.getElementById("news");
news.innerHTML = htmlStr;
function delayLoad() {

    //ele.offsetHeight+ele.offsetTop =< win("clientHeight")+win("scrollTop"); 加载图片

    // if (this.isLoad){
    //     return;
    // }
    var _this = this;
    var _H = public.win("clientHeight") + public.win("scrollTop");
    var _h = this.parentNode.offsetHeight + public.offset(this.parentNode).top;
    if (_H > _h) {
        //this.isLoad = true;
        var imgCur = document.createElement("img");
        imgCur.src = this.getAttribute("data-src");
        //onload 只要图片地址能够加载出来，就触发这个事件
        imgCur.onload = function () {
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
    var timer=null;
    //this就是那张延迟加的图片，现在让它渐变
    timer = window.setInterval(function () {
        var n = public.css(_this,"opacity");
        if(n>=1){
            window.clearInterval(timer);
            public.css(_this,"opacity",1);
            return;
        }
        public.css(_this,"opacity",n += 0.01);

    },10)
}