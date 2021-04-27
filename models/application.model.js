const mongoose = require("mongoose");

const Application = mongoose.model(
  "Application",
  new mongoose.Schema({
    FirstName: String,
    LastName: String,
    Email: String,
    Phone: Number,
    Position: String,
    Website: String,
    Salary: Number,
    Notice: String,
    relocate: String,
    Comments: String,
    LastCompany:String,
    Resume: String
  })
);

module.exports = Application;
