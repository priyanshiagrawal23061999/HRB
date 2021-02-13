const db = require("../models");


const Employees = db.employees;
const Departments = db.departments;
const WorkTypes = db.WorkTypes;


exports.getEmployees = (req, res) =>{
    console.log("show employees for smart table")
}

exports.insertEmployee = (req, res) =>{
    console.log(req.body)
     console.log(Employees)
    Employees.insertOne(req.body).then(function(){ 
        res.send('inserted') // Success 
    }).catch(function(error){ 
        console.log(error)      // Failure 
    }); 
}

exports.getDepartments = (req, res) =>{
    console.log("show employees for smart table")
    WorkTypes.find({},['title'],(err, docs) =>{
        if (err){
            res.status(500).send(err)
        }
        if (docs){
            res.send(docs)
        }
    })
}

exports.getWorkTypes = (req, res) =>{
    console.log("show employees for smart table")
    Departments.find({},['title'],(err, docs) =>{
        if (err){
            res.status(500).send(err)
        }
        if (docs){
            res.send(docs)
        }
    })
}



