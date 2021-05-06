const mongoose = require("mongoose");

const Notices = mongoose.model(
  "Notices",
  new mongoose.Schema({
    NoticeId: String,
    Title: String,
    Description: String,
    NoticeDate: String,
    CreatedAt: Date,
  })
);

module.exports = Notices;
