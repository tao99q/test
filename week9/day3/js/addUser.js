/**
 * Created by zhanghongtao on 2017/6/28.
 */
$("#submit").click(function () {
    var userName = $("#userName").val();
    $.ajax({
        url: "/addUserInfo",
        type: "post",
        dataType: "json",
        async: false,
        data: {
            name: userName
        },
        cache: false,
        success: function (result) {
            if (result & result.code === 0) {
                alert("增加成功");
                window.location.href="index.html";
            } else {
                alert("增加成功");
            }

        },
        error: function (e) {
            console.log(e);
        }
    });
});