const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require("cors");
const InitiateMongoServer = require("./config/db.config");
  const db = require("./models");

const chalk = require("chalk");

InitiateMongoServer();
const app = express();

global.__basedir = __dirname;

var corsOptions = {
    origin: "*"
  };
app.use(cors(corsOptions));


const router = require('./router');

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// app.use(bodyParser.text());
app.use(morgan('dev'));

app.use('/api', router);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to HR application." });
  });

var server = app.listen(9000, function(){
    var port = server.address().port;
    console.log(chalk.bgGreen('Server is running on port',port));
});