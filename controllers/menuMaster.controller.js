const db = require("../models");
const mongoose = require("mongoose");

const Employees = db.employees;
const User = db.user;

exports.getEmployees = (req, res) => {
  Employees.find({}, function (err, users) {
    if (err){
      return res.send(500).send({message : err.message});
    }
    var userMap = {};

    users.forEach(function (user) {
      userMap[user._id] = user;
    });

    res.send(userMap);
  });
};

exports.getEmployeeName = (req, res) =>{
  Employees.find({},{EmployeeName:1}, (err, users)=>{
    if (err){
      return res.status(500).send({message : err.message});
    }

    res.status(200).send(users);
  })
}

exports.insertEmployee = (req, res) => {
  const employee = new Employees(req.body);

      Employees.findOne(
        { Email: employee.Email },
        (err, emp) => {
          if (!emp) {
            // The below two lines will add the user's
            // ObjectID to the the employee's User array field
            employee
              .save()
              .then((result) => {
                return res.status(201).send({ message: "Employee created!" });
              })
              .catch((err) => {
                return res.status(500).send(err);
              });
          }
          if (emp) {
            Employees.updateOne(
              { Email: employee.Email },
              req.body,
              (err, success) => {
                if (err) {
                  return res.status(500).send(err.message);
                }
                if (success) {
                  return res.status(200).send({ message: "Employee Updated!" });
                }
              }
            );
          }
        }
      );
};

exports.getEmployeeById = (req, res) => {
  const id = req.params.id;
  Employees.findById({ _id: mongoose.Types.ObjectId(id) })
    .then((emp) => {
      return res.status(200).json(emp);
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });                     
};

exports.searchEmployee = (req, res) => {
  var query = req.params.query;

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
        res.status(500).send(err);
      }
      res.json(result);
    }
  );
};
