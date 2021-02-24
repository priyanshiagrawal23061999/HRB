const db = require("../models");
const mongoose = require("mongoose");

const Employees = db.employees;
const User = db.user;

exports.getEmployees = (req, res) => {
  Employees.find({}, function (err, users) {
    var userMap = {};

    users.forEach(function (user) {
      userMap[user._id] = user;
    });

    res.send(userMap);
  });
};

exports.insertEmployee = (req, res) => {
  const employee = new Employees(req.body);
  User.findOne({ _id: mongoose.Types.ObjectId(req.userId) }, (err, user) => {
    if (user) {
      employee.User.push(user);
      Employees.findOne(
        { User: mongoose.Types.ObjectId(req.userId) },
        (err, emp) => {
          if (!emp) {
            // The below two lines will add the user's
            // ObjectID to the the employee's User array field
            employee
              .save()
              .then((result) => {
                return res.status(200).send({ message: "Employee created!" });
              })
              .catch((err) => {
                return res.status(500).send(err);
              });
          }
          if (emp) {
            Employees.updateOne(
              { User: mongoose.Types.ObjectId(req.userId) },
              req.body,
              (err, success) => {
                if (err) {
                  return res.status(500).send(err.message);
                }
                if (success) {
                  return res.status(204).send({ message: "Employee Updated!" });
                }
              }
            );
          }
        }
      );
    }
    if (err) return res.status(500).send({ message: err.err.message });
  });
};
// exports.insertEmployee = (req, res) =>{
//     console.log(req.body)
//     if((req.body.EmployeeName==null || req.body.EmployeeName=='') ||
//     (req.body.Company==null || req.body.Company=='' )||
//         (req.body.Department==null || req.body.Department=='') ||
//         (req.body.Designation==null || req.body.Designation=='') ||
//         (req.body.Email==null || req.body.Email=='') ||
//         (req.body.JoiningDate == null || req.body.JoiningDate == '') ||
//         (req.body.ReportingTo==null || req.body.ReportingTo=='') ||
//         (req.body.DOB==null || req.body.DOB=='') ||
//         (req.body.WorkType==null || req.body.WorkType=='') ||
//         (req.body.EmploymentType==null || req.body.EmploymentType=='') ||
//         (req.body.OfficeBranch==null || req.body.OfficeBranch=='') ||
//         (req.body.EmployeeGrade==null || req.body.EmployeeGrade=='') ||
//         (req.body.EmployeeGroup==null || req.body.EmployeeGroup=='') ||
//         (req.body.EmployeeType==null || req.body.EmployeeType=='') ||
//         (req.body.Value==null || req.body.Value=='') ||
//         (req.body.EffectiveDate==null || req.body.EffectiveDate=='')){
//             res.status(422).send('Fill all the required fields')
//         }
//         else{
//     emplId = ""
//     Employees.countDocuments({Company:{$gte: req.body.Company}}, function (err, count) {
//         emplId = `0601${req.body.Company}${count+1}`
//         req.body.EmployeeId = emplId

//         Employees.create(req.body, function(err, data){
//             if(err){
//                 console.log('error')
//                 res.status(500).send(err)
//             }
//             else{
//             res.send('inserted') // Success
//             }
//         })
//       });

//     }

// }
exports.getEmployeeById = (req, res) => {
  const id = req.params.id;
  console.log(id);
  Employees.findOne({ User: mongoose.Types.ObjectId(id) })
    .then((emp) => {
      console.log(emp);
      return res.status(200).json(emp);
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });                     
};

exports.searchEmployee = (req, res) => {
  var query = req.params.query;
  console.log(query);

  Employees.find(
    {
      $or: [
        { EmployeeId: query },
        { EmployeeName: query },
        { Company: query },
        { Department: query },
        { Designation: query },
        { Email: query },
        { ReportingTo: query },
        { WorkType: query },
        { EmploymentType: query },
        { OfficeBranch: query },
        { EmployeeGrade: query },
        { EmployeeGroup: query },
        { EmployeeType: query },
        { Value: query },
      ],
    },
    function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }
      console.log(result);
      res.json(result);
    }
  );
};
