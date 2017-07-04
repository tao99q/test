/**
 * Created by zhanghongtao on 2017/5/14.
 */
var public = (function () {
    //1.将类数组转成数组
    function toArray(likeArray) {
        try {
            return Array.prototype.slice.call(likeArray);
        } catch (e) {
            var ary = [];
            for (var i = 0; i < likeArray.length; i++) {
                ary.push(likeArray[i]);
            }
            return ary
        }
    }

    //2.将JSON字符串转为JSON对象
    function toJsonObj(jsonStr) {
        return "JSON" in window ? JSON.parse(jsonStr) : eval("(" + jsonStr + ")");
    }

    //3.获取浏览器的盒子模型信息

    function win(attr, value) {
        if (typeof  value == "undefined") {
            return document.documentElement[attr] || document.body[attr];
        } else {
            document.documentElement[attr] = value;
            document.body[attr] = value;
        }
    }

    //4.获取当前元素距离body的偏移量
    function offset(curEle) {
        var l = curEle.offsetLeft;
        var t = curEle.offsetTop;
        var p = curEle.offsetParent;
        while (p) {
            if (window.navigator.userAgent.indexOf("MSIE 8")) {
                l += p.clientLeft;
                t += p.clientTop
            }

            l += p.offsetLeft;
            t += p.offsetTop;
            p = p.offsetParent;
        }

        return {
            left: l,
            top: t
        }
    }

    //5.获取随机数
    function getRandom(n, m) {
        n = Number(n);
        m = Number(m);
        if (isNaN(n) || isNaN(m)) {
            return Math.random();
        }
        if (n > m) {
            var n = n + m;
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
            if ("opactiy" == attr || "filter" == attr) {
                val = curEle.currentStyle["filter"];
                var reg = /^alpha\(opactiy=(\d+(?:\.\d+)?)\)$/;
                val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
            } else {
                val = curEle.currentStyle[attr];
            }
        }
        var reg = /^-?\d+(\.\d+)?(px|pp|pt|em|rem|deg)?$/;
        return reg.test(val) ? parseFloat(val) : val;

    }

    //7.给元素设置样式属性
    function setCss(curEle, attr, val) {
        if (attr == "opacity") {
            curEle.style.opacity = val;
            curEle.style.filter = "alpha(opacity=" + (val * 100) + ")";
            return;
        }
        if (attr == "float") {
            curEle.style.cssFloat = val;
            curEle.style.styleFloat = val;
            return;
        }
        var reg = /^(width|height|left|top|bottom|right|(margin|padding)(Top|Bottom|Left|Right)?)$/;
        if (reg.test(attr)) {
            val = !isNaN(val) ? val + "px" : val;
        }
        curEle.style[attr] = val;

    }

    //8.批量设置样式属性
    function setGroupCss(curEle, cssObj) {
        cssObj = cssObj || []
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
        if (arguments.length === 3) {
            // setCss(arguments[0],arguments[1],arguments[2]);
            //setCss中的this也是public
            setCss.apply(this, arguments);
            return;
        }
        if (arguments.length === 2 && arguments[1].toString() == "[object object]") {
            setGroupCss.apply(this, arguments);
            return;
        }
        return getCss.apply(this, arguments);
    }

    //10.判断元素中有没有指定的class名
    function hasClass(curEle, classStr) {
        return new RegExp("(^| +)" + classStr + "( +|$)").test(curEle.className);
    }

    //11.为元素增加class
    function addClass(curEle, classStr) {
        classStr = classStr.replace(/^ +| +$/, "").split(/ +/g);
        for (var i = 0; i < classStr.length; i++) {
            if (this.hasClass(curEle, classStr[i])) {
                curEle.className += " " + classStr[i];
            }
        }
        curEle.className = curEle.className.replace(/^ +| +$/, "");
    }

    //12.为元素删除一个或多个class
    function removeClass(curEle, classStr) {
        classStr = classStr.replace(/^ +| +$/, "").split(/ +/g);
        for (var i = 0; i < classStr.length; i++) {
            var reg = new RegExp("(^| +)" + classStr[i] + "( +|$)");
            hasClass(curEle, classStr[i]) ? curEle.className = curEle.className.replace(reg, " ") : null;
        }
        curEle.className.replace(/^ +| +$/, "");
    }

    //13.判断元素是否存在class,有就删除，没有就增加
    function toggleClass(curEle, classStr) {
        classStr = classStr.replace(/^ +| +$/, "").split(/ +/g);
        for (var i = 0; i < classStr; i++) {
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

})();
