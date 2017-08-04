let mongoose = require('mongoose');
let Movie = require('../model');

let write = (movies, callback) => {
    Movie.create(movies, (error, datas) => {
        if (error) {
            callback(error, movies);
        } else {
            callback(null, datas);
        }
    })
};

module.exports = write;