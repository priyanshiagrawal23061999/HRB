const db = require("../models");
const mongoose = require("mongoose");
// const { validationResult } = require("express-validator");

const Calendar = db.calendar;

exports.addEvent = (req, res) => {

    Calendar.insertMany(req.body).then(function(){ 
    }).catch(function(error){ 
        console.log(error)      // Failure 
    }); 
}

exports.showEvents = (req, res) => {
    Calendar.find({}, function (err, events) {
        if (err){
          return res.status(500).send({message : err.message});
        }
       else{
        return res.status(200).send(events);
       }
      });
}

exports.deleteEvent = (req, res) => {
  var query = req.params.query;

    Calendar.findOneAndDelete({ title: query }, function (err) {
        if(err) {
            console.log(err);
            res.send(err)
        }
        res.send("Successful deletion")
      });
}