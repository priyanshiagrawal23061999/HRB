const mongoose = require("mongoose");

const Employees = mongoose.model(
  "Employees",
  new mongoose.Schema({
    // basic Information
    EmployeeId: String,
    EmployeeName: String,
    Company: String,
    Department: String,
    Designation: String,
    Email: Number,
    JoiningDate: Date,
    ReportingTo: String,
    DOB: Date,
    WorkType: String,

    // Work Information
    EmploymentType: String,
    OfficeBranch: String,
    EmployeeGrade: String,
    EmployeeGroup: String,
    EmployeeType: String,
    Value: String,
    EffectiveDate: Date,
    PF: String,
    ESI: String,
    CIN: String,
    LeavingDate: Date,
    Address: String,
    Description: String,
    
    // Banking Information
    BankAccount: Number,
    BankName: String,
    BankBranch: String,
    IFSC: String,
    PaymentType: String,
    PAN: String,

    // Emergency Contact Information
    ContactName: String,
    ContactMobile: Number,
    ContactEmail: String,
    ContactAddress: String,

  })
);

module.exports = Employees;
