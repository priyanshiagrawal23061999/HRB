const db = require("../models");


const Employees = db.employees;
const Departments = db.departments;
const WorkTypes = db.WorkTypes;


exports.getEmployees = (req, res) =>{
    console.log("show employees for smart table")
}

exports.insertEmployee = (req, res) =>{
    emplId = ""
    Employees.countDocuments({Company:{$gte: req.body.Company}}, function (err, count) {
        emplId = `0601${req.body.Company}${count+1}`
        req.body.EmployeeId = emplId
        
        Employees.create(req.body).then(function(){ 
            res.send('inserted') // Success 
        }).catch(function(error){ 
            console.log(error)      // Failure 
        }); 
      });
     
    
}





