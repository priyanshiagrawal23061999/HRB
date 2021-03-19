const mongoose = require("mongoose");

const FixInterview = mongoose.model(
  "FixInterview",
  new mongoose.Schema({
    Vacancy: String,
    Candidate: String,
    InterviewTime: String,
    Date: Date,
    Method: String,
    Status: String,
    Comments: String
  })
);

module.exports = FixInterview;
