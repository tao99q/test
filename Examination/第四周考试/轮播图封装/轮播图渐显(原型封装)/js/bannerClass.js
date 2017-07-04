//创建一个Banner类
function Banner(id, url, interval) {
    //this是个实例
    this.url = url + "?time=" + new Date().getTime();
    this.interval = interval || 2000;
    this.banner = document.getElementById(id);
    this.bannerInner = this.banner.getElementsByTagName("div")[0];
    this.imgList = this.bannerInner.getElementsByTagName("img");
    this.focusList = this.banner.getElementsByTagName("ul")[0];
    this.list = this.focusList.getElementsByTagName("li");
    this.btnLeft = this.banner.getElementsByTagName("a")[0];
    this.btnRight = this.banner.getElementsByTagName("a")[1];
    this.data = null;
    this.timer = null;
    this.step = 0;
    this.isOk = true;
}

//公有属性方法
//获取数据:getData
Banner.prototype.getData = function () {
    //this 如果是实例去执行这个方法,this就是实例
    var _this = this;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", this.url, false);
    xhr.onreadystatechange = function () {
        _this.data = public.toJsonObj(xhr.responseText);
    }
    xhr.send(null);
};

//公有方法bindData 绑定数据
Banner.prototype.bindData = function () {
    var str1 = ``, str2 = ``;
    for (var i = 0; i < this.data.length; i++) {
        str1 += `<div><img src="" photo="${this.data[i].src}"alt=""></div>`;
        str2 += i === 0 ? `<li class="selected"></li>` : `<li></li>`;
    }

    this.bannerInner.innerHTML = str1;
    this.focusList.innerHTML = str2;

};

//公有方法imgDelay 延迟加载
Banner.prototype.imgDelay = function () {
    var _this = this;
    for (var i = 0; i < this.imgList.length; i++) {
        var curImg = document.createElement("img");
        curImg.src = this.imgList[i].getAttribute("photo");
        curImg.i = i;
        curImg.onload = function () {
            _this.imgList[this.i].src = this.src;
            if (this.i == 0) {
                public.css(_this.imgList[0].parentNode, "zIndex", 1);
                animation(_this.imgList[0].parentNode, {opacity: 1}, 1000);
            }
        }
    }
};

//公有方法move
Banner.prototype.move = function () {
    if (this.isOk) {
        this.isOk = false;
        this.step++;
        if (this.step == this.data.length) {
            this.step = 0;
        }
        this.setImg();
    }

};

//公有方法setImg
Banner.prototype.setImg = function () {
    var _this = this;
    for (var i = 0; i < this.imgList.length; i++) {
        if (i == this.step) {
            public.css(_this.imgList[i].parentNode, "zIndex", 1);
            animation(this.imgList[i].parentNode, {opacity: 1}, 1000, function () {
                var sib = public.siblings(this);
                for (var j = 0; j < sib.length; j++) {
                    public.css(sib[j], {opacity: 0});
                }
                _this.isOk = true;
            });
        } else {
            public.css(this.imgList[i].parentNode, "zIndex", 0);
        }
    }
    for (var i = 0; i < this.list.length; i++) {
        this.list[i].className = i === this.step ? "selected" : "";
    }
};

//公有方法mouseEvent
Banner.prototype.mouseEvent = function () {
    var _this = this;
    this.banner.onmouseover = function () {
        window.clearInterval(_this.timer);
        _this.btnLeft.style.display = "block";
        _this.btnRight.style.display = "block";
    }
    this.banner.onmouseout = function () {
        _this.timer = window.setInterval(function () {
            _this.move();
        }, _this.interval)
        _this.btnLeft.style.display = "none";
        _this.btnRight.style.display = "none";
    }
};

//公有方法 btnClick 左右切换
Banner.prototype.btnClick = function () {
    var _this = this;
    this.btnLeft.onclick = function () {
        if (_this.isOk) {
            _this.isOk = false;
            if (_this.step == 0) {
                _this.step = _this.data.length;
            }
            _this.step--;
            _this.setImg();
        }
    }
    this.btnRight.onclick = function () {
        _this.move();
    }
};

//公有方法 focusClick
Banner.prototype.focusClick = function () {
    var _this = this;
    for (var i = 0; i < this.list.length; i++) {
        this.list[i].i = i;
        this.list[i].onclick = function () {
            if (_this.isOk) {
                _this.isOk = false;
                _this.step = this.i;
                _this.setImg();
            }
        }
    }
};

//公有方法 init初始化
Banner.prototype.init = function () {
    var _this = this;
    this.getData();
    this.bindData();
    this.imgDelay();
    this.mouseEvent();
    this.btnClick();
    this.focusClick();
    this.timer = window.setInterval(function () {
        _this.move();
    }, this.interval)
};