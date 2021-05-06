const mongoose = require("mongoose");

const PayHead = mongoose.model(
  "PayHead",
  new mongoose.Schema({
    PayHeadId: String,
    PayHead: String,
    Type: String,
    ShortCode: String,
    CalculatedType: String,
    Value: Number,
    CreatedAt: Date,
  })
);

module.exports = PayHead;
