const db = require("../models");
const mongoose = require("mongoose");

const Training = db.training;


exports.addFeedback = (req, res) =>{
    console.log(req.body)
    Training.findOneAndUpdate({TrainingName: req.body.TrainingName,
    Employee: req.body.Employee}, {Feedback: req.body.Feedback}, {
        new: true
      }).then(function(){ 
        res.send({message: 'inserted'}) // Success 
    }).catch(function(error){ 
        console.log(error)      // Failure 
    }); 
}

