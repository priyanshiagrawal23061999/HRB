const mongoose = require("mongoose");

const JobVacancy = mongoose.model(
  "JobVacancy",
  new mongoose.Schema({
    JobTitle: String,
    VacancyName: String,
    HiringManager: String,
    NoOfPosition: Number,
    JobLocation: String,
    JobDescription: String,
    Active: Boolean
  })
);

module.exports = JobVacancy;
