const mongoose = require("mongoose");

const EventCalendar = mongoose.model(
  "EventCalendar",
  new mongoose.Schema({
    title: String,
    start: Date,
    end: Date,
    allDay: Boolean
  })
);

module.exports = EventCalendar;
