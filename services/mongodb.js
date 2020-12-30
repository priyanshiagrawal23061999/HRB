const chalk = require("chalk");
const { MongoClient } = require("mongodb");

//import mongodb
const mongodb = require("mongodb");
const { Collection } = require("mongoose");

const mongoClient = mongodb.MongoClient;

const mongoConnect = 
  MongoClient.connect('mongodb+srv://P2:Pawan08082000@hrm.ucxfy.mongodb.net/HRM?retryWrites=true&w=majority',
   { useUnifiedTopology: true } 
   //remove the deprecation warning by adding the option
   ).then(
    result => {
      console.log(chalk.bgGreen("Connected to database"));
      const db = result.db('HRM')
    const Collection = db.collection('users')
      // callback(result);
      Collection.insertOne({nme: 'Anshum', age: 21, email: 'riya@yhoo.in'})
      .then(result => {
        console.log(result)
      })
      .catch(error => console.error(error))

    }
  ).catch(err => {
    console.log(err)
  })


module.exports = [mongoConnect,Collection];




// //Import the mongoose module
// var mongoose = require('mongoose');

// //Set up default mongoose connection
// var mongoDB = 'mongodb+srv://P2:Pawan08082000@hrm.ucxfy.mongodb.net/HRM?retryWrites=true&w=majority';
// mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

// //Get the default connection
// var db = mongoose.connection;

// //Bind connection to error event (to get notification of connection errors)
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// //ok
// db.once('open', () => {
//   console.log(chalk.bgGreen('MongoDB database connection established successfully!'));
// });

// module.exports = {mongoose: db}