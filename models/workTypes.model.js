const mongoose = require("mongoose");

const WorkTypes = mongoose.model(
  "WorkTypes",
  new mongoose.Schema({
    title: String,
  })
);

module.exports = WorkTypes;
