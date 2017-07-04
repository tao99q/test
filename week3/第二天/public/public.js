/**
 * Created by zhanghongtao on 2017/5/14.
 */
var public = (function () {
    //1.将类数组转成数组
    function toArray(likeArray) {

    }

    //2.将JSON字符串转为JSON对象
    function toJsonObj(jsonStr) {

    }

    //3.获取浏览器的盒子模型信息

    function win(attr, val) {

    }

    //4.获取当前元素距离body的偏移量
    function offset(curEle) {

    }

    //5.获取随机数
    function getRandom(n, m) {

    }

    //6.获取当前元素的样式
    function getCss(curEle, attr) {


    }

    //7.给元素设置样式属性
    function setCss(curEle, attr, val) {


    }

    //8.批量设置样式属性
    function setGroupCss(curEle, cssObj) {

    }

    //9.获取或设置样式
    function css() {

    }

    //10.判断元素中有没有指定的class名
    function hasClass(curEle, classStr) {

    }

    //11.为元素增加class
    function addClass(curEle, classStr) {

    }

    //12.为元素删除一个或多个class
    function removeClass(curEle, classStr) {

    }

    //13.判断元素是否存在class,有就删除，没有就增加
    function toggleClass(curEle, classStr) {

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
