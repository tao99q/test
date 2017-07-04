/**
 * Created by zhanghongtao on 2017/6/26.
 */
let fs = require("fs"),
    less = require("less");
// less.render("@c:red;body{color:@c}",function (error,result) {
//     console.log(result.css);
// });
// fs.readFile("./less/less1.less","utf-8",function (error,result) {
//     console.log(result);
// });
// fs.readdir("./less","utf-8",function (error,result) {
//     console.log(result);
// });
// less.render(fs.readFileSync("./less/less1.less", "utf-8"), function (error, res) {
//     console.log(res.css);
//     fs.mkdir("./css");
//     fs.writeFileSync("./css/css1.css",res.css,"utf-8");
// });
let lesses = fs.readdirSync("./less");
lesses.forEach((item, index) => {
    if (!/\.less/.test(item)) {
        return;
    }
    let lessFile = fs.readFileSync("./less/" + item, "utf-8");
    less.render(lessFile, (error, res) => {
        var res = res.css;
        var cssFile = item.replace(/\.less$/, ".css");
        fs.writeFileSync("./css/" + cssFile, res, "utf-8");
    });
});