const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require("cors");

const chalk = require("chalk");

const app = express();

var corsOptions = {
    origin: "http://localhost:8000"
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

  const db = require("./models");
  const Role = db.role;
  
  db.mongoose
    .connect(`mongodb+srv://P2:Pawan08082000@hrm.ucxfy.mongodb.net/HRM?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log(chalk.bgGreen("Connected to database"));
      initial();
    })
    .catch(err => {
      console.error("Connection error", err);
      process.exit();
    });
  
  function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'user' to roles collection");
        });
  
        new Role({
          name: "moderator"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'moderator' to roles collection");
        });
  
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'admin' to roles collection");
        });
      }
    });
  }

var server = app.listen(9000, function(){
    var port = server.address().port;
    console.log(chalk.bgGreen('Server is running on port',port));
});