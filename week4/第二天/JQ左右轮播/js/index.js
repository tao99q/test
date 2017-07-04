/**
 * Created by zhanghongtao on 2017/5/21.
 */
;(function () {
    function banner(url, interVal) {
        var $interVal = interVal || 2000;
        var $bannerInner = this.children(".bannerInner");
        var $focusList = this.children(".focusList");
        var $imgList = null;
        var $list = null;
        var $left = this.children(".left");
        var $right = this.children(".right");
        var $data = null;
        var $step = 0;
        var $timer = null;
        var $flag = false;
        //1.获取数据
        $.ajax({
            type: "GET",
            url: url + "?$=" + new Date().getTime(),
            dataType: "json",
            async: false,
            data: null,
            success: function (data) {
                $data = data;
                bindData();
            },
            error: function () {
                console.log("error");
            }

        });
        function bindData() {
            var str1 = ``, str2 = ``;
            if ($data.length > 0) {
                $.each($data, function (index, item) {
                    str1 += `<div><img src="" photo="${this['src']}" alt=""></div>`;
                    str2 += index === 0 ? `<li class="selected"></li>` : `<li></li>`;
                })
                str1 += `<div><img src="" photo="${$data[0]['src']}" alt=""></div>`;
                $bannerInner.css({width: ($data.length + 1) * 800}).html(str1);
                $focusList.html(str2);
                $imgList = $bannerInner.find("img");
                $list = $focusList.children("li");
            }
        }

        function delayLoad() {
            $imgList.each(function (index, item) {
                var _this = this;
                var curImg = new Image;
                curImg.src = $(this).attr("photo");
                curImg.onload = function () {
                    $(_this).prop("src", this.src).stop().animate({opacity: 1}, 1000);
                }
            })
        }

        function changeBanner() {
            if (!$flag) {
                $flag = true;
                $bannerInner.stop().animate({left: $step * -800}, 1000, function () {
                    if ($step == $data.length) {
                        $step = 0;
                        $bannerInner.css({left: 0});
                    }
                    $flag = false;
                })
                if ($step == $data.length) {
                    $list.eq(0).addClass("selected").siblings().removeClass("selected");
                    return;
                }
                $list.eq($step).addClass("selected").siblings().removeClass("selected");
            }
        }

        function move() {
            $step++;
            changeBanner();
        }

        this.mouseover(function () {
            window.clearInterval($timer);
            $left.css({display: "block"});
            $right.css({display: "block"});
        }).mouseout(function () {
            $timer = window.setInterval(move, $interVal);
            $left.css({display: "none"});
            $right.css({display: "none"});
        })

        $right.click(function () {
            move();
        })
        $left.click(function () {
            if (!$flag) {
                $flag = true;
                if ($step == 0) {
                    $step = $data.length;
                    $bannerInner.css({left: $step * -800});
                }
                $step--;
                $bannerInner.stop().animate({left: $step * -800}, 1000, function () {
                    $flag = false;
                })
                $list.eq($step).addClass("selected").siblings().removeClass("selected");
            }

        })
        $list.click(function () {
            $step = $(this).index();
            changeBanner();
        })
        $timer = window.setInterval(move, $interVal);
        window.setTimeout(delayLoad(), 500);
    }

    jQuery.fn.extend({
        banner: banner
    })
})();