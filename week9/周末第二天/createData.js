

let fs = require("fs");
let str1 = "赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶姜戚谢邹喻柏水窦章云苏潘葛奚范彭郎鲁韦昌马苗凤花方俞任袁柳酆鲍史唐费廉岑薛雷贺倪汤滕殷罗毕郝邬安常乐于时傅皮卞齐康伍余元卜顾孟平黄和穆萧尹姚邵湛汪祁毛禹狄米贝明臧计伏成戴谈宋茅庞熊纪舒屈项祝董梁杜阮蓝闵席季麻强贾路娄危江童颜郭梅盛林刁钟徐邱骆高夏蔡田樊胡凌霍虞万支柯昝管卢莫经房裘缪干解应宗丁宣贲邓郁单杭洪包诸左石崔吉钮龚程嵇邢滑裴陆荣翁荀羊於惠甄麴家封芮羿储靳汲邴糜松井段富巫乌焦巴弓牧隗山谷车侯宓蓬全郗班仰秋仲伊宫宁仇栾暴甘钭厉戎祖武符刘景詹束龙叶幸司韶郜黎蓟薄印宿白怀蒲邰从鄂索咸籍赖卓蔺屠蒙池乔阴郁胥能苍双闻莘党翟谭贡劳逄姬申扶堵冉宰郦雍舄璩桑桂濮牛寿通边扈燕冀郏浦尚农温别庄晏柴瞿阎充慕连茹习宦艾鱼容向古易慎戈廖庾终暨居衡步都耿满弘匡国文寇广禄阙东殴殳沃利蔚越夔隆师巩厍聂晁勾敖融冷訾辛阚那简饶空曾毋沙乜养鞠须丰巢关蒯相查後荆红游竺权逯盖益桓公";
let str2 =["嘉懿","煜城","懿轩","烨伟","苑博","伟泽","熠彤","鸿煊","博涛","烨霖","烨华","煜祺","智宸","正豪","昊然","明杰","立诚","立轩","立辉","峻熙","弘文","熠彤","鸿煊","烨霖","哲瀚","鑫鹏","致远","俊驰","雨泽","烨磊","晟睿","天佑","文昊","修洁","黎昕","远航","旭尧","鸿涛","伟祺","荣轩","越泽","浩宇","瑾瑜","皓轩","擎苍","擎宇","志泽","睿渊","楷瑞","子轩","弘文","哲瀚","雨泽","鑫磊","修杰","伟诚","建辉","晋鹏","天磊","绍辉","泽洋","明轩","健柏","鹏煊","昊强","伟宸","博超","君浩","子骞","明辉","鹏涛","炎彬","鹤轩","越彬","风华","靖琪","明诚","高格","光华","国源","冠宇","晗昱","涵润","翰飞","翰海","昊乾","浩博","和安","弘博","宏恺","鸿朗","华奥","华灿","嘉慕","坚秉","建明","金鑫","锦程","瑾瑜","晋鹏","经赋","景同","靖琪","君昊","俊明","季同","开济","凯安","康成","乐语","力勤","良哲","理群","茂彦","敏博","明达","朋义","彭泽","鹏举","濮存","溥心","璞瑜","浦泽","奇邃","祺祥","荣轩","锐达","睿慈","绍祺","圣杰","晟睿","思源","斯年","泰宁","天佑","同巍","奕伟","祺温","文虹","向笛","心远","欣德","新翰","兴言","星阑","修为","旭尧","炫明","学真","雪风","雅昶","阳曦","烨熠","英韶","永贞","咏德","宇寰","雨泽","玉韵","越彬","蕴和","哲彦","振海","正志","子晋","自怡","德赫","君平"];
let ary = [];
/**
 * {"id":1,"name","","sex","","score",19}
 */
for(let i=1;i<88;i++){

    var obj = {
        id:i,
        name:str1[ran(0,str1.length-1)]+str2[ran(0,str2.length-1)],
        sex:ran(0,1),
        score:ran(0,100)
    }
    ary.push(obj);
}


function ran(m,n) {
    return Math.round(Math.random()*(n-m+1) +m);
}
fs.writeFileSync("json/userList.json",JSON.stringify(ary),"utf-8");