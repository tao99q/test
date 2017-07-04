/**
 * Created by Administrator on 2017/5/23.
 */
function Banner(id, url, duration) {
    duration = duration || 2000;
    var banner = document.getElementById(id);
    var bannerInner = banner.getElementsByTagName("div")[0];
    var focusList = banner.getElementsByTagName("ul")[0];
    var list = focusList.getElementsByTagName("li");
    var btnLeft = banner.getElementsByTagName("a")[0];
    var btnRight = banner.getElementsByTagName("a")[1];
    var dataAry = null;
    banner.step = 0;
    banner.timer = null;
    banner.isOkClick = false;
    //1.获取数据
    ;(function () {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                dataAry = public.toJsonObj(xhr.responseText);
            }
        }
        xhr.send(null);
        bindData();
        allLoad();
    })();


    //2.绑定数据
    function bindData() {
        var str1 = ``, str2 = ``;
        for (var i = 0; i < dataAry.length; i++) {
            str1 += `<div><img src=""  photo="${dataAry[i].src}" alt=""></div>`;
            str2 += i === 0 ? `<li class="selected"></li>` : `<li></li>`;
        }
        str1 += `<div><img src=""  photo="${dataAry[0].src}" alt=""></div>`;
        public.css(bannerInner, "width", (dataAry.length + 1) * 800);
        bannerInner.innerHTML = str1;
        focusList.innerHTML = str2;
    }

    function delayLoad() {
        var _this = this;
        var curImg = document.createElement("img");
        curImg.src = this.getAttribute("photo");
        curImg.onload = function () {
            _this.src = _this.getAttribute("photo");
            animate(_this, {opacity: 1}, 1000);
        }
    }

    function allLoad() {
        var imgList = bannerInner.getElementsByTagName("img");
        for (var i = 0; i < imgList.length; i++) {
            delayLoad.call(imgList[i]);
        }
    }


    banner.onmouseover = function () {
        window.clearInterval(banner.timer);
        btnLeft.style.display = "block";
        btnRight.style.display = "block";
    }
    banner.onmouseout = function () {
        banner.timer = window.setInterval(move, 3000);
        btnLeft.style.display = "none";
        btnRight.style.display = "none";
    }
    function move() {
        if (banner.step == dataAry.length) {
            banner.step = 0;
            public.css(bannerInner, {left: 0});
        }
        banner.step++;
        focusAlign();
        animate(bannerInner, {left: banner.step * -800}, 1000,function () {
            banner.isOkClick = true;
        });

    }

    btnRight.onclick = function () {
        if( banner.isOkClick) {
            banner.isOkClick = false;
            move();
        }
    }

    btnLeft.onclick = function () {
        if( banner.isOkClick){
            banner.isOkClick = false;
            if (banner.step == 0) {
                banner.step = dataAry.length;
                public.css(bannerInner, {left: banner.step * -800});
            }
            banner.step--;
            focusAlign();
            animate(bannerInner, {left: banner.step * -800}, 1000,function () {
                banner.isOkClick = true;
            });

        }

    }
    banner.timer = window.setInterval(move, 3000);

    function focusAlign() {
        for (var i = 0; i < list.length; i++) {
            banner.step == dataAry.length ? list[0].className = "selected" : null;
            list[i].className = i == banner.step ? "selected" : "";
        }
    }
    ;(function () {
        for(var i=0;i<list.length;i++){
            list[i].i = i;
            list[i].onclick = function () {
                if(banner.isOkClick){
                    banner.isOkClick = false;
                    banner.step = this.i;
                    focusAlign();
                    animate(bannerInner, {left: banner.step * -800}, 1000,function () {
                        banner.isOkClick = true;
                    });
                }


            }
        }
    })();
}