const mongoose = require("mongoose");

const Training = mongoose.model(
  "Training",
  new mongoose.Schema({
    TrainingName: String,
    Employee: String,
    Feedback: String,
    
  })
);

module.exports = Training;
