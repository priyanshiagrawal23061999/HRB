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
    Employees.create(req.body).then(function(){ 
        res.send('inserted') // Success 
    }).catch(function(error){ 
        console.log(error)      // Failure 
    }); 
}





