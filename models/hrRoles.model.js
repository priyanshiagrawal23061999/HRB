const mongoose = require("mongoose");

const HrRoles = mongoose.model(
  "HrRoles",
  new mongoose.Schema({
    title: String,
    iconName : String,
  })
);

module.exports = HrRoles;
