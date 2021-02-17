const db = require("../models");


const Employees = db.employees;


exports.getEmployees = (req, res) =>{
    console.log("show employees for smart table")
    Employees.find({}, function(err, users) {
        var userMap = {};
    
        users.forEach(function(user) {
          userMap[user._id] = user;
        });
        
        res.send(userMap);  
      });
}

exports.insertEmployee = (req, res) =>{
    emplId = ""
    Employees.countDocuments({Company:{$gte: req.body.Company}}, function (err, count) {
        emplId = `0601${req.body.Company}${count+1}`
        req.body.EmployeeId = emplId
        
        Employees.create(req.body, function(err, data){ 
            if(err){
                console.log('error')
                res.status(500).send(err)
            }
            else{
            res.send('inserted') // Success 
            }
        })
      });
     
    
}





