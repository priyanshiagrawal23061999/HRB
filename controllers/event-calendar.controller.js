const db = require("../models");
const mongoose = require("mongoose");
// const { validationResult } = require("express-validator");

const Calendar = db.calendar;

exports.addEvent = (req, res) => {

    Calendar.insertMany(req.body).then(function(){ 
        res.send('inserted') // Success 
    }).catch(function(error){ 
        console.log(error)      // Failure 
    }); 
}

exports.showEvents = (req, res) => {
    Calendar.find({}, function (err, events) {
        if (err){
          return res.send(500).send({message : err.message});
        }
       else{
        res.send(events);
       }
      });
}

exports.deleteEvent = (req, res) => {
  var query = req.params.query;

    console.log(query)
    Calendar.findOneAndDelete({ title: query }, function (err) {
        if(err) console.log(err);
        console.log("Successful deletion");
      });
}