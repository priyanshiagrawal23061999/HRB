const db = require("../models");

const JobVacancy = db.jobVacancy;


exports.insertJobVacancy = (req, res) =>{
    console.log(req.body)
    JobVacancy.insertMany(req.body).then(function(){ 
        res.send({message: 'inserted'}) // Success 
    }).catch(function(error){ 
        console.log(error)      // Failure 
    }); 
}