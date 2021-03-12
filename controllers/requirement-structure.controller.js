const db = require("../models");

const JobVacancy = db.jobVacancy;
const fixInterview = db.fixInterview


exports.insertJobVacancy = (req, res) =>{
    console.log(req.body)
    JobVacancy.insertMany(req.body).then(function(){ 
        res.send({message: 'inserted'}) // Success 
    }).catch(function(error){ 
        console.log(error)      // Failure 
    }); 
}

exports.getJobVacancy = (req, res) => {
    JobVacancy.find({Active: true}, function (err, jobs) {
        if (err){
          return res.send(500).send({message : err.message});
        }
        else{
            console.log(jobs)
        res.send(jobs);
        }
      });
}

exports.fixInterview = (req, res) =>{
    console.log(req.body.Date)
    fixInterview.insertMany(req.body).then(function(){ 
        res.send({message: `Interview Fixed on ${req.body.Date}`}) // Success 
    }).catch(function(error){ 
        console.log(error)      // Failure 
    }); 
}