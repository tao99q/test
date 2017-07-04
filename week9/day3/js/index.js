/**
 * Created by zhanghongtao on 2017/6/28.
 */
$.ajax({
    url: "/getAllUserList",
    type: "get",
    dataType: "json",
    async: false,
    data: null,
    success: function (result) {
        if (result && result.code == 0) {
            bindData(result.data);
        }
    },
    error: function (e) {
        console.log(e);
    }
});
function bindData(data) {
    let htmlStr = ``;
    $.each(data, function (index, item) {
        let {id, name} = item;
        htmlStr += `<li>
                    <span>${id}</span>
                    <span>${name}</span>
                    <span >
                        <a href="javascript:;" data-id="${id}">删除</a>
                     </span>
                   </li>`;
    });
    $("#content").html(htmlStr);
}
$("li").on("click", "a", function () {
    let id = $(this).attr("data-id"),
        flag = confirm(`确定要删除ID为[${id}]的用户吗?`);
    let index = $("#content li").index($(this).parent().parent());
    if (flag) {
        $.ajax({
            url: "/removeUser",
            type: "get",
            dataType: "json",
            async: false,
            data: {
                id: id
            },
            cache: false,
            success: function (result) {
                if (result.code == 0) {
                    alert("删除成功");
                    $("li").eq(index).remove();
                }else{
                    alert("删除失败");
                }
            },
            error: function (e) {
                console.log(e);
            }
        });
    }

});