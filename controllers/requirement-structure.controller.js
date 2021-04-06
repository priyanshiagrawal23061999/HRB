const db = require("../models");
const nodemailer = require("../config/nodemailer.config");
const mongoose = require("mongoose");
const e = require("cors");

const JobVacancy = db.jobVacancy;
const fixInterview = db.fixInterview


exports.insertJobVacancy = (req, res) =>{
    
    JobVacancy.findOne(
      { JobTitle: req.body.JobTitle, VacancyName: req.body.VacancyName },
      (err, emp) => {
        if (!emp) {
          // The below two lines will add the user's
          // ObjectID to the the employee's User array field
          JobVacancy
            .insertMany(req.body)
            .then(() => {
              return res.status(201).send({ message: "Added!" });
            })
            .catch((err) => {
              return res.status(500).send(err);
            });
        }
        if (emp) {
          JobVacancy.updateOne(
            { JobTitle: req.body.JobTitle, VacancyName: req.body.VacancyName },
            req.body,
            (err, success) => {
              if (err) {
                return res.status(500).send(err.message);
              }
              if (success) {
                return res.status(200).send({ message: "Vacancy Updated!" });
              }
            }
          );
        }
      }
    );
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
      
    JobVacancy.findOne(
      { Candidate: req.body.Candidate},
      (err, emp) => {
        if(err){
          console.log(err)
        }
        if (!emp) {
          // The below two lines will add the user's
          // ObjectID to the the employee's User array field
          fixInterview
            .insertMany(req.body)
            .then(() => {
              if(req.body.Status == "Called For Interview"){
      nodemailer.sendConfirmationEmail(
        req.body.Candidate,
        (subject = "Interview Schedule"),
        (body = `<h2>Dear Candidate </h2>
      <p>
      Your interview for the role of ${req.body.Vacancy} has been scheduled on ${req.body.Date}
      at ${req.body.InterviewTime}. 
      </p>
      <div><p>
      <p>${req.body.Comments}</p>

      Regards<br>
      M2aster HR
      </p></div>`)
      );
    return res.send({message: `Interview Fixed on ${req.body.Date}`}) // Success 
      }
      else return res.status(201).send({ message: "Added!" });
            })
            .catch((err) => {
              return res.status(500).send(err);
            });
        }
        if (emp) {
          fixInterview.updateOne(
            { JobTitle: req.body.JobTitle, VacancyName: req.body.VacancyName },
            req.body,
            (err, success) => {
              if (err) {
                return res.status(500).send(err.message);
              }
              if (success) {
                // return res.status(200).send({ message: " Updated!" });
              if(req.body.Status == "Called For Interview"){
                
      nodemailer.sendConfirmationEmail(
        req.body.Candidate,
        (subject = "Interview Schedule"),
        (body = `<h2>Dear Candidate </h2>
      <p>
      Your interview for the role of ${req.body.Vacancy} has been scheduled on ${req.body.Date}
      at ${req.body.InterviewTime}. 
      </p>
      <p>${req.body.Comments}</p>
      <div><p>
      Regards<br>
      M2aster HR
      </p></div>`)
      );
    return res.send({message: `Interview Fixed on ${req.body.Date}`}) // Success 
      }
      else{
                return res.status(200).send({ message: " Updated!" });

      }
              }
            }
          );
        }
      },
    ) 
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