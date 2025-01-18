const mongoose = require('mongoose');
const winston=require('winston');

module.exports = function(){
    mongoose.connect('mongodb://mongoCont:27017/lbs')
    .then(winston.info('Connected to mongodb...'));
}