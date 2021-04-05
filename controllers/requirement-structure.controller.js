const db = require("../models");
const nodemailer = require("../config/nodemailer.config");
const mongoose = require("mongoose");

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
        nodemailer.sendConfirmationEmail(
            req.body.Candidate,
            (subject = "Interview Schedule"),
            (body = `<h2>Dear Candidate </h2>
          <p>
          Your interview for the role of ${req.body.Vacancy} has been scheduled on ${req.body.Date}
          at ${req.body.InterviewTime}. 
          </p>
          <div><p>
          Regards<br>
          M2aster HR
          </p></div>`)
          );
        res.send({message: `Interview Fixed on ${req.body.Date}`}) // Success 
    }).catch(function(error){ 
        console.log(error)      // Failure 
    }); 
}

exports.getSchedule = (req,res) => {
    fixInterview.find({}, function (err, interview) {
        if (err){
          return res.send(500).send({message : err.message});
        }
        else{
            console.log(interview)
        res.send(interview);
        }
      });   
}


exports.getVacancyById = (req, res) => {
    const id = req.params.id;
    JobVacancy.findById({ _id: mongoose.Types.ObjectId(id) })
      .then((emp) => {
        return res.status(200).json(emp);
      })
      .catch((err) => {
        return res.status(500).json({ message: err.message });
      });                     
  };

  exports.getScheduleById = (req, res) => {
    const id = req.params.id;
    fixInterview.findById({ _id: mongoose.Types.ObjectId(id) })
      .then((emp) => {
        return res.status(200).json(emp);
      })
      .catch((err) => {
        return res.status(500).json({ message: err.message });
      });                     
  };