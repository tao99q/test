/**
 * Created by zhanghongtao on 2017/6/24.
 */
// var ajax = (function (param) {
//     let xhr = createXHR();
//     param["async"] = param["async"] || true;
//     xhr.open(param["type"],param["url"],param["async"]);
//
// })(param);
;(function () {
    /**
     * 1.处理xhr的兼容问题
     */
    function createXHR() {
        var xhr = null,
            ary = [
                function () {
                    return new XMLHttpRequest();
                },
                function () {
                    return new ActiveXObject("Microsoft.XMLHTTP");
                },
                function () {
                    return new ActiveXObject("Msxml2.XMLHTTP");
                },
                function () {
                    return new ActiveXObject("Msxml3.XMLHTTP");
                }
            ];
        for (var i = 0; i < ary.length; i++) {
            try {
                xhr = ary[i]();
                createXHR = ary[i];
                break;
            } catch (e) {

            }
        }
        return xhr;
    }

    let ajax = function (xhrObj) {
        //1先给传递的参数设置默认值，当执行ajax的时候，传的参数就会覆盖，有些属性没传，就使用默认值
        let _default = {
            url: null,
            method: "GET",
            data: null,
            dataType: "text",//dataType并不会影响服务器返回值，只是用于客户端对返回数据的解析处理
            cache: true,
            async: true,
            success: null

        };
        //2将传进来的对象xhrObj跟默认_default关联
        for (let key in xhrObj) {
            if (xhrObj.hasOwnProperty(key)) {
                if (key == "type") {
                    _default["method"] = xhrObj[key];
                    continue;
                }
                _default[key] = xhrObj[key] || _default[key];
            }
        }
        //发送AJAX请求 get系列 post系列
        //使用正则匹配get系列
        let regGET = /(GET|DELETE|HEAD)/i;
        //1)创建一个AJAX对象
        let xhr = createXHR();
        //2)open 打开一个url;
        xhr.open(_default["method"], _default["url"], _default["async"]);

        //3)监听状态
        xhr.onreadystatechange = function () {
            //HTTP状态码 以2或3开头是成功的，其余的是失败的，在这里失败不做处理
            if (!/^(2|3)\d{2}$/.test(xhr.status)) {
                return;
            }
            if (xhr.readyState !== 4) {
                return;
            }
            //下面的代码代表响应主体被客户端接收成功
            //获取响应主体，服务器返回的一般都是字符串或者是XML，我们需要根据传进来的dataType的值，将响应主变成我们想要的数据类型，如果不能正常转换，就返回一个空串""；
            let result = xhr.responseText();
            try {
                switch (_default.dataType.toUpperCase()) {
                    case "JSON":
                        result = "JSON" in window ? JSON.parse(result) : eval("(" + result + ")");
                        break;
                    case "XML":
                        result = xhr.responseXML;
                        break;
                }
            } catch (e) {
                result = "";
            }
            !typeof _default.success == "function" ? _default.success.call(this, result) : null;
        };
        /**
         * 1.get 方式参数拼接到url上 key1=value1&key2=value2
         * 2.请求参数值value1,value2编码
         * 3.cache:false 做清除缓存处理
         *
         */

        //1.
        _default.url += "?1=1" ;
        if (regGET.test(_default.method)) {
            for(let dataKey in _default.data){
                _default.url += "&"+dataKey+"="+_default.data[dataKey];
            }
            _default.url = encodeURIComponent(_default.url);
            _default.data = null;
        }
        //2.
        if (!_default.cache) {
            _default.url += "&_="+ (new Date()).getTime();
        }

        xhr.send(_default.data);
    };
    window.ajax = ajax;
})();

// var public = (function () {
//     function json(str) {
//             return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")");
//     }
//     function xml(str) {
//         return xml
//     }
//     return{
//         JSON:json,
//         XML:XML
//     }
// })();