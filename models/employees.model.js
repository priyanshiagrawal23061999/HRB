const mongoose = require("mongoose");

const Employees = mongoose.model(
  "Employees",
  new mongoose.Schema({
    // basic Information
    // EmployeeId: String,
    EmployeeName: String,
    Company: String,
    Department: String,
    Designation: String,
    Email: String,
    JoiningDate: { type: Date, default: Date.now },
    ReportingTo: String,
    DOB:  {
      type: Date,
      // The dates of the first and last episodes of
      // Star Trek: The Next Generation
      // min: '1987-09-28',
      max: '2005-05-23'
      
    },
    WorkType: String,

    // Work Information
    // User: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //   },
    // ],
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
