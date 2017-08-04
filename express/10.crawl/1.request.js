let request = require('request'),
    iconv = require('iconv-lite');
let cheerio = require('cheerio');
request({url: 'http://top.baidu.com/category?c=1', encoding: null}, (error, response, body) => {
    if (error) console.log(error);
    // console.log(response);
    body = iconv.decode(body, 'gbk');
    let $ = cheerio.load(body);
    $('.hd .title a').each((index, item) => {
        console.log($(item).text());
    });

});