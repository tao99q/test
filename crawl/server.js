let express = require('express'),
    app = express(),
    path = require('path'),
    Movie = require('./model');
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);
app.use(express.static(path.resolve('node_modules')))
app.get('/', (req, res) => {
    Movie.find({}, (error, movies) => {
        res.render('index', {movies})
    })
});
app.listen(8080);