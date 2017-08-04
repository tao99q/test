/**
 * 读取服务器数据
 */
let request = require('request'),
    iconv = require('iconv-lite'),
    cheeiro = require('cheerio');

module.exports = (url, callback) => {
    request({url, encoding: null}, (error, response, body) => {
        let movies = [];
        if (!error && response.statusCode == 200) {
            body = iconv.decode(body, "gbk");
            let $ = cheeiro.load(body);

            $('.keyword a.list-title').each((index, item) => {
                let $this = $(item);
                let movie = {
                    name: $this.text(),
                    url: $this.attr('href')
                };
                movies.push(movie);
            });
            callback(null, movies);
        } else {
            callback(error, movies);
        }


    });
};
