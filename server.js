const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const chalk = require("chalk");
const mongoConnect = require('./services/mongodb')

const app = express();

const router = require('./router');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(morgan('dev'));

app.use(router);

var server = app.listen(9000, function(){
    var port = server.address().port;
    console.log(chalk.bgGreen('Server is running on port',port));
});