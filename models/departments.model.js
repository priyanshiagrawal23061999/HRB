const mongoose = require("mongoose");

const Departments = mongoose.model(
  "Departments",
  new mongoose.Schema({
    title: String,
  })
);

module.exports = Departments;
