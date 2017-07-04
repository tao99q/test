/**
 * Created by 银鹏 on 2017/5/21.
 */
(function () {
    function banner(url, interval) {
        var $bannerInner = this.children(".bannerInner");
        var $bannerTip = this.children(".bannerTip");
        var $bannerLeft = this.children(".bannerLeft");
        var $bannerRight = this.children(".bannerRight");
        var $data = null;
        var $imgList = null;
        var $list = null;
        var $divs = null;
        var $step = 0;
        var $interval = interval || 2000;
        var $timer = null;
        var $isOk = true;
        $.ajax({
            type: "get",
            url: url + "?$=" + new Date().getTime(),
            dataType: "json",
            async: false,
            data: null,
            success: function (data) {
                $data = data;
                console.log($data);
            },
            error: function () {
                console.log("错误!")
            }
        });
        //绑定数据
        ;
        (function () {
            if ($data && $data.length > 0) {
                var str1 = ``, str2 = ``;
                $.each($data, function (index, item) {
                    str1 += `<div><img src="" photo="${item['img']}" alt=""></div>`;
                    str2 += index === 0 ? `<li class="bg"></li>` : `<li></li>`;
                })
                $bannerInner.html(str1);
                $bannerTip.html(str2);
                $imgList = $bannerInner.find("img");
                $list = $bannerTip.children("li");
                $divs = $bannerInner.children("div");
            }
        })();
        //图片 延迟加载
        function delay() {
            $imgList.each(function (index, item) {
                var _this = this;
                var curImg = new Image;
                curImg.src = $(item).attr("photo");
                curImg.onload = function () {
                    $(_this).prop("src", this.src).css({display: "block"});
                }
            })
            $divs.eq(0).css({zIndex: 10}).stop().animate({opacity: 1}, 500);
        };

        window.setTimeout(delayLoad, 500);
        //4.封装个轮播效果
        function changeBanner() {
            var $div = $divs.eq($step);
            $div.css({zIndex: 10}).siblings().css({zIndex: 0});
            $div.stop().animate({opacity: 1}, 500, function () {
                $(this).siblings().css({opacity: 0});
                $isOk = true;
            })
            $list.eq($step).addClass("bg").siblings().removeClass("bg");
        };

        //4.自动轮播
        function move() {
            if ($isOk) {
                $isOk = false;
                if ($step == $data.length - 1) {
                    $step = -1;
                }
                $step++;
                changeBanner();
            }
        };

        //鼠标移入
        this.mouseover(function () {
            window.clearInterval($timer);
            $bannerLeft.css({display: "block"});
            $bannerRight.css({display: "block"});
        }).mouseout(function () {
            $timer = window.setInterval(move, $interval);
            $bannerLeft.css({display: "none"});
            $bannerRight.css({display: "none"});
        });
        $bannerLeft.click(function () {
            if ($isOk) {
                $isOk = false;
                if ($step == 0) {
                    $step = $data.length;
                }
                $step--;
                changeBanner();
            }
        });
        $bannerRight.click(function () {
            move();
        });

        $list.click(function () {
            if ($isOk) {
                $isOk = false;
                $step = $(this).index();

                changeBanner();
            }
        })

        $timer = window.setInterval(move, $interval);
    };


    //将banner方法扩展到JQ的原型上
    jQuery.fn.extend({
        banner: banner
    })
})();
