const chalk = require("chalk");

//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb+srv://P2:Pawan08082000@hrm.ucxfy.mongodb.net/HRM?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//ok
db.once('open', () => {
  console.log(chalk.bgGreen('MongoDB database connection established successfully!'));
});

module.exports = {mongoose: db}