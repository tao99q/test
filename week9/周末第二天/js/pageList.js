/**
 * Created by zhanghongtao on 2017/6/25.
 */
//单例模式封装
var pageRender = (function () {
    var box = document.getElementById("box"),
        list = document.getElementById("list"),
        pageBtn = document.getElementById("page"),
        pageNum = document.getElementById("pageNum"),
        pageInput = document.getElementById("pageInput");
    var total = 0;
    var page = 1;
    //从服务器获取数据，并绑定到页面
    function bindHTML() {
        function fn(result) {
            if (!result) return;
            total = parseInt(result["total"]);

            var data = result["data"];
            var htmlStr = ``;
            for (var i = 0; i < data.length; i++) {
                htmlStr += `<li>
                                <span>${data[i]["id"]}</span>
                                <span>${data[i]["name"]}</span>
                                <span>${data[i]["sex"] == 1 ? "女" : "男"}</span>
                                <span>${data[i]["score"]}</span>
                            </li>`;
            }
            list.innerHTML = htmlStr;
            var str = ``;
            for (var j = 1; j <= total; j++) {
                if (j == page) {
                    str += `<li class="bg">${j}</li>`;
                    continue;
                }
                str += `<li>${j}</li>`
            }
            pageNum.innerHTML = str;
        }

        ajax({
            url: "/getUserList?page=" + page,
            type: "GET",
            dataType: "json",
            success: fn
        });

    }

    //使用事件委托处理点击事件
    function bindEvent(e) {
        e = e || window.event;
        e.target = e.target || e.srcElement;
        var tarTag = e.target.tagName.toUpperCase(),
            tarInn = e.target.innerHTML;
        //计算每个span的page值
        if (tarTag == "SPAN") {

            if (tarInn == "首页") {
                if (page == 1) {
                    return;
                }
                page = 1;
            }
            if (tarInn == "上一页") {
                if (page == 1) {
                    return;
                }
                page--;
            }
            if (tarInn == "下一页") {
                if (page == total) {
                    return;
                }
                page++;
            }
            if (tarInn == "尾页") {
                if (page == total) {
                    return;
                }
                page = total;
            }
        }
        if (tarTag == "LI") {
            if (page == parseInt(tarInn)) return;
            page = parseInt(tarInn);
        }
        pageInput.onkeyup = function (e) {
            e = e || window.event;
            //验证是否输入有交数字，如果不是有效数字显示当前页
            var val = this.value;
            if (isNaN(val)) {
                this.value = page;
                return;
            }
            if (e.keyCode === 13) {
                if (val < 1) {
                    val = 1;
                }
                if (val > total) {
                    val = total;
                }
                this.value = val;
                page = Math.round(val);
                bindHTML();
            }
        }
        bindHTML();
    }

    return {
        init: function () {
            //开始加载页面里就请求一次，做一次数据绑定，展示第一页的内容
            bindHTML();
            //处理分页点击事件,采用事件委托，通过判断事件源处理
            pageBtn.onclick = bindEvent;
            //pageinput输入事件，跳页

        }
    }
})();
pageRender.init();