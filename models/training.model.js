const mongoose = require("mongoose");

const Training = mongoose.model(
  "Training",
  new mongoose.Schema({
    TrainingName: String,
    Employee: String,
    Feedback: Array,
    Trainer: String,
    Description: String
  })
);

module.exports = Training;
