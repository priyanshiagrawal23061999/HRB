const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const chalk = require("chalk");
const mongoose = require('./services/mongoose')

const app = express();

app.use(bodyParser.json());

app.use(morgan('dev'));

var server = app.listen(9000, function(){
    var port = server.address().port;
    console.log(chalk.bgGreen('Server is running on port',port));
});