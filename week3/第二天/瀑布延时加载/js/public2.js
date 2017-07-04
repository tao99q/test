/**
 * Created by Yancy on 2017/5/17.
 */

var public = function () {
    //1.转数组
    function toArray(likeArray) {
        try {
            return Array.prototype.slice.call(likeArray);
        } catch (e) {
            var ary = [];
            for (var i = 0; i < likeArray.length; i++) {
                ary.push(likeArray[i]);
            }
            return ary;
        }
    }

    //2.将JSON字符串转为JSON对象
    function toJsonObj(jsonStr) {
        try {
            return JSON.parse(jsonStr);
        } catch (e) {
            return eval("(" + jsonStr + ")");
        }
    }

    //3.获取浏览器的盒子模型信息
    function win(attr, val) {
        if (typeof val == "undefined") {
            return document.documentElement[attr] || document.body[attr];
        } else {
            document.documentElement[attr] = val;
            document.body[attr] = val;
        }

    }

    //4.获取当前元素距离body的偏移量
    function offset(curEle) {
        var l = curEle.offsetLeft;
        var t = curEle.offsetTop;
        var p = curEle.offsetParent;
        while (p) {
            if (window.navigator.userAgent.indexOf("MSIE 8") == -1) {
                l += p.clientLeft; //加上父级参照物的左边框
                t += p.clientTop;//加上父级参照物的上边框
            }


            l += p.offsetLeft;//加上元素距离父级参照物的左偏移量
            t += p.offsetTop;//加上元素距离父级参照物的右偏移量
            p = p.offsetParent;
        }

        return {
            left: l,
            top: t
        }
    }

    //5.获取随机数
    function getRandom(n, m) {
        if (isNaN(n) || isNaN(m)) {
            return Math.random();
        }

        if (n > m) {
            n = n + m;
            m = n - m;
            n = n - m;
        }
        return Math.round(Math.random() * (m - n) + n);
    }

    //6.获取当前元素的样式
    function getCss(curEle, attr) {
        var val = null;
        if ("getComputedStyle" in window) {
            val = window.getComputedStyle(curEle)[attr];
        } else {
            if ("opacity" == attr || "filter" == attr) {
                val = curEle.currentStyle["filter"];
                var reg = /^alpha\(opacity=\d+(?:\.\d+)?\)$/;
                return reg.test(val) ? reg.exec(val)[1] / 100 : 1;
            } else {
                return curEle.currentStyle[attr];
            }
        }
    }

    //7.给元素设置样式属性
    function setCss(curEle, attr, val) {
        if (attr == "opacity" || attr == "filter") {
            curEle.style.opacity = val;
            curEle.style.filter = "alpha(opacity=" + (val * 100) + ")";
            return;
        }

        if (attr == "float") {
            curEle.style.cssFloat = val;
            curEle.style.styleFloat = val;
            return
        }
        var reg = /^width|height|top|bottom|(padding|margin)(TOp|Left|Right|Bottom)?$/;
        if (reg.test(attr)) {
            val = isNaN(val) ? val + "px" : val;
        }
        curEle.style[attr] = val;
    }

    //8.批量设置样式属性
    function setGroupCss(curEle, cssObj) {
        cssObj = cssObj || [];
        if (cssObj.toString() == "[object object]") {
            for (attr in cssObj) {
                if (cssObj.hasOwnProperty(attr)) {
                    setCss(curEle, attr, cssObj[attr]);
                }
            }
        }
    }

    //9.获取或设置样式
    function css() {
        if (arguments.length == 3) {
            setCss.apply(this, arguments);
            return;
        } else if (arguments.length == 2 && arguments[1].toString() == "[object object]") {
            setGroupCss.apply(this, arguments)
            return;
        }
        return getCss(this, arguments);
    }

    //10.判断元素中有没有指定的class名
    function hasClass(curEle, classStr) {
        return new RegExp("(^| +)" + classStr + "( +|$)").test(curEle.className);
    }

    //11.为元素增加class
    function addClass(curEle, classStr) {
        classStr = classStr.replace(/^ +| +$/, "").split(/ +/);
        for (var i = 0; i < classStr.length; i++) {
            curEle.className += " " + classStr[i];
        }
        curEle.className = curEle.className.replace(/^ +| +$/, "");
    }

    //12.为元素删除一个或多个class
    function removeClass(curEle, classStr) {
        classStr = classStr.replace(/^ +| +$/, "").split(/ +/);
        for (var i = 0; i < classStr.length; i++) {
            var reg = new RegExp("(^| +)" + classStr[i] + "( +|$)");
            hasClass(curEle, classStr[i]) ? curEle.className.replace(reg, " ") : null;
        }
        curEle.className = curEle.className.replace(/^ +| +$/, "");
    }

    //13.判断元素是否存在class,有就删除，没有就增加
    function toggleClass(curEle, classStr) {
        classStr = classStr.replace(/^ +| +$/, "").split(/ +/);
        for (var i = 0; i < classStr.length; i++) {
            hasClass(curEle, classStr[i]) ? removeClass(curEle, classStr[i]) : addClass(curEle, classStr[i]);
        }
    }

    return {
        toArray: toArray,
        toJsonObj: toJsonObj,
        win: win,
        offset: offset,
        getRandom: getRandom,
        css: css,
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass
    }
}();