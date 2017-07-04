/**
 * Created by zhanghongtao on 2017/6/24.
 */
(function () {
    //处理参数，拼接并参数值转码
    let codeData = (data) => {
        if (typeof data == "object") {
            let temp = ``;
            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                    temp += `${key}=${encodeURIComponent(data[key])}&`;
                }
            }
            ;
            data = temp.replace(/&$/, "");
        }
        return data;
    };
    //检测url是否有?,如果有返回&，否则返回?；
    let checkMark = (url) => {
        url.indexOf("?") != -1 ? "&" : "?";
    };

    let ajax = function (xhrObj) {
        let _default = {
            url: null,
            method: "GET",
            data: null,
            dataType: "text",
            cache: true,
            async: true,
            success: null
        };
        for (let key in xhrObj) {
            if (xhrObj.hasOwnProperty(key)) {
                if (key == "type") {
                    _default["method"] = xhrObj[key];
                    continue;
                }
                _default[key] = xhrObj[key];
            }
        }
        let regGET = /(GET|DELETE|HEAD)/i;
        if (regGET.test(_default.method)) {
            //拼接url，处理参数和缓存问题
            if (_default.data != null) {
                _default.url += `${checkMark(_default.url)}${codeData(_default.data)}`;
            }

            if (!_default.cache) {
                _default.url += `${checkMark(_default.url)}_=${(new Date()).getTime()}`;
            }
            //清空data请求参数
            _default.data = null;
        }
        let xhr = new XMLHttpRequest();
        xhr.open(_default.method, _default.url, _default.async);
        xhr.onreadystatechange = function () {
            if (!/^(2|3)\d{2}&/.test(xhr.status)) {
                return;
            }
            if (xhr.readyState !== 4) {
                return;
            }
            let result = xhr.responseText;
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
            typeof _default.success == "function" ? _default.success.call(this, result) : null;
        }
        _default.data = codeData(_default.data);
        xhr.send(_default.data);
    };
    window.ajax = ajax;
})();