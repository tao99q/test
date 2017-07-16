/**
 * Created by zhanghongtao on 2017/7/9.
 */
/**
 *
 * @param url
 * @param type
 * @param dataType
 * @param async
 * @param data
 * @returns {Promise}
 */
let ajax = ({url = "", type = "GET", dataType = "text", async = true, data = {}}) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(type, url, async);
        xhr.responseType = dataType;
        xhr.onload = () => resolve(xhr.response);
        xhr.onerror = (err) => reject(err);
        xhr.send(JSON.stringify(data));
    });
};

