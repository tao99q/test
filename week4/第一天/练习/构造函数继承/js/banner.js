/**
 * Created by Administrator on 2017/5/25.
 */
function Banner(id, url, duration) {
    this.url = url;
    this.duration = duration || 2000;
    this.banner = document.getElementById(id);
    this.bannerInner = this.banner.getElementsByTagName("div")[0];
    this.focusList = this.banner.getElementsByTagName("ul")[0];
    this.list = this.focusList.getElementsByTagName("li");
    this.imgList = this.bannerInner.getElementsByTagName("img");
    this.btnLeft = this.banner.getElementsByTagName("a")[0];
    this.btnRight = this.banner.getElementsByTagName("a")[1];
    this.dataAry = null;
    this.step = 0;
    this.timer = null;
    this.isOk = true;
}
//1.ajax 获取数据
Banner.prototype.getData = function () {
    var _this = this;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", this.url + "?ss=" + new Date().getTime(), false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            _this.dataAry = public.toJsonObj(xhr.responseText);
        }
    };
    xhr.send(null);
};

//2.绑定数据
Banner.prototype.bindData = function () {
    var str1 = ``;
    var str2 = ``;
    for (var i = 0; i < this.dataAry.length; i++) {
        str1 += `<div><img src="" photo="${ this.dataAry[i].src}" alt=""></div>`;
        str2 += i === 0 ? `<li class="selected"></li>` : `<li></li>`;
    }
    str1 += `<div><img src="" photo="${ this.dataAry[0].src}" alt=""></div>`;
    public.css(this.bannerInner, {width: (this.dataAry.length + 1) * 800});
    this.bannerInner.innerHTML = str1;
    this.focusList.innerHTML = str2;
};

//3.延迟加载图片
Banner.prototype.delayLoad = function () {
    var _this = this;
    for (var i = 0; i < this.imgList.length; i++) {
        var curImg = document.createElement("img");
        curImg.src = this.imgList[i].getAttribute("photo");
        curImg.i = i;
        curImg.onload(function () {
            _this.imgList[this.i].src = this.src;
            animate(_this.imgList[this.i], {opacity: 1}, 700);
        });
    }
};

//4.图片切换
Banner.prototype.move = function () {
    var _this = this;
    if (this.step == this.dataAry.length) {
        this.step = 0;
        public.css(this.bannerInner, {left: 0});
    }
    this.step++;
    animate(this.bannerInner, {left: this.step * -800}, 1000, function () {
        _this.isOk = true;
    });
    this.focusAlign();
};
//焦点切换
Banner.prototype.focusAlign = function () {
    for (var i = 0; i < this.list.length; i++) {
        this.list[i].className = this.step == i ? "selected" : "";
    }
    this.step == this.dataAry.length ? this.list[0].className = "selected" : null;
};

Banner.prototype.btnClick = function () {
    var _this = this;
    this.btnRight.onclick = function () {
        if (_this.isOk) {
            _this.isOk = false;
            _this.move();
        }
    };
    this.btnLeft.onclick = function () {
        if (_this.isOk) {
            _this.isOk = false;
            if (_this.step === 0) {
                _this.step = _this.dataAry.length;
                public.css(_this.bannerInner, {left: _this.step * -800});
            }
            _this.step--;
            animate(_this.bannerInner, {left: _this.step * -800}, 1000, function () {
                _this.isOk = true;
            });
            _this.focusAlign();
        }

    };
};
//公有方法mouseEvent
Banner.prototype.mouseEvent = function () {
    var _this = this;
    this.banner.onmouseover = function () {
        window.clearInterval(_this.timer);
        _this.btnLeft.style.display = "block";
        _this.btnRight.style.display = "block";
    };
    this.banner.onmouseout = function () {
        _this.timer = window.setInterval(function () {
            if (_this.isOk) {
                _this.isOk = false;
                _this.move();
            }
        }, _this.duration);
        _this.btnLeft.style.display = "none";
        _this.btnRight.style.display = "none";
    };
};

Banner.prototype.focusClick = function () {
    var _this = this;
    for (var i = 0; i < this.list.length; i++) {
        this.list[i].i = i;
        this.list[i].onclick = function () {
            if (_this.isOk) {
                _this.isOk = false;
                _this.step = this.i;
                animate(_this.bannerInner, {left: _this.step * -800}, 1000, function () {
                    _this.isOk = true;
                });
                _this.focusAlign();
            }

        };
    }
};
Banner.prototype.init = function () {
    var _this = this;
    this.getData();
    this.bindData();
    this.delayLoad();
    this.mouseEvent();
    this.btnClick();
    this.focusClick();
    this.timer = window.setInterval(function () {
        if (_this.isOk) {
            _this.isOk = false;
            _this.move();
        }
    }, this.duration);

};

