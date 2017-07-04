window.Banner = (function () {
    return function (id, url, duration) {
        var banner = document.getElementById(id);
        var bannerInner = banner.getElementsByTagName("div")[0];
        var focusList = banner.getElementsByTagName("ul")[0];
        var imgList = bannerInner.getElementsByTagName("img");
        var list = focusList.getElementsByTagName("li");
        var btnLeft = banner.getElementsByTagName("a")[0];
        var btnRight = banner.getElementsByTagName("a")[1];
        var data = null;
        banner.auto = false;
        banner.isOk = true;
        //1.获取数据
        ;
        (function () {
            var _this = this;
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url + "?time=" + new Date().getTime(), false);
            xhr.onreadystatechange = function () {
                banner.data = public.toJsonObj(xhr.responseText);
            }
            xhr.send(null);
        })();
        //2.绑定数据
        ;
        (function () {
            if (banner.data && banner.data.length > 0) {
                var str1 = ``, str2 = ``;
                for (var i = 0; i < banner.data.length; i++) {
                    str1 += `<div><img src="" photo="${banner.data[i].src}" alt=""/></div>`;
                    str2 += i === 0 ? `<li class="selected"></li>` : `<li></li>`;
                }
                str1 += `<div><img src="" photo="${banner.data[0].src}" alt=""/></div>`;
                bannerInner.innerHTML = str1;
                public.css(bannerInner, {width: (banner.data.length + 1) * 800});
                focusList.innerHTML = str2;
            }
        })();
        //3.延迟加载
        ;
        (function () {
            for (var i = 0; i < imgList.length; i++) {
                var curImg = document.createElement("img");
                curImg.src = imgList[i].getAttribute("photo");
                curImg.i = i;
                curImg.onload = function () {
                    imgList[this.i].src = this.src;
                    animation(imgList[this.i], {opacity: 1}, 1000);
                }
            }
        })();
        banner.step = 0;
        function move() {
            if(banner.isOk){
                banner.isOk = false;

                if (banner.step == banner.data.length) {
                    banner.step = 0;
                    public.css(bannerInner, {left: banner.step * -800})
                }
                banner.step++;
                animation(bannerInner, {left: banner.step * -800},function () {
                    banner.isOk = true;
                });
                focusAlign();
            }
        };
        function focusAlign() {
            for (var i = 0; i < list.length; i++) {
                banner.step == banner.data.length ? list[0].className = "selected" : null;
                list[i].className = banner.step === i ? "selected" : "";
            }

        };

        function autoMove() {
            banner.auto = true;
            banner.timer = window.setInterval(move, duration);
        };
        function btnClick() {
            btnLeft.onclick = function () {
                if (banner.isOk) {
                    banner.isOk = false;
                    if (banner.step == 0) {
                        banner.step = banner.data.length;
                        public.css(bannerInner, {left: banner.step * -800})
                    }
                    banner.step--;
                    animation(bannerInner, {left: banner.step * -800},function () {
                        banner.isOk = true;
                    });
                    focusAlign();
                }

            };
            btnRight.onclick = function () {
                move();
            }
        };
        banner.onmouseover = function () {
            window.clearInterval(banner.timer);
            btnLeft.style.display = "block";
            btnRight.style.display = "block";
        };
        banner.onmouseout = function () {
            btnLeft.style.display = "none";
            btnRight.style.display = "none";
            if (banner.auto) {
                banner.timer = window.setInterval(move, duration);
            }
        };


        function focusClick() {
            for (var i = 0; i < list.length; i++) {
                list[i].i = i;
                list[i].onclick = function () {
                    if (banner.isOk) {
                        banner.isOk = false;
                        banner.step = this.i;
                        animation(bannerInner, {left: banner.step * -800},function () {
                            banner.isOk = true;
                        });
                        focusAlign();
                    }
                }
            }
        }

        return {
            autoMove: autoMove,
            btnClick: btnClick,
            focusClick: focusClick
        }


    };
})();