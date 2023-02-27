const helmet = require('helmet');
const compression = require('compression');
const { application } = require('express');

module.exports = function(app){
app.use(helmet());
app.use(compression());
}