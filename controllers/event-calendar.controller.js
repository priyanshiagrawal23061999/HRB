const db = require("../models");
const mongoose = require("mongoose");
// const { validationResult } = require("express-validator");

const Calendar = db.calendar;

exports.addEvent = (req, res) => {
    console.log(req.body)

    Calendar.insertMany(req.body).then(function(){ 
        res.send('inserted') // Success 
    }).catch(function(error){ 
        console.log(error)      // Failure 
    }); 
}