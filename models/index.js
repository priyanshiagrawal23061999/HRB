const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.hrRoles = require("./hrRoles.model")
db.employees = require("./employees.model")
db.calendar = require("./event-calendar.model")
db.jobVacancy = require("./JobVacancy.model")
db.fixInterview = require("./fix-interview.model")
db.training = require("./training.model")
db.leave = require("./leave.model");
db.ROLES = ["user", "admin", "moderator"];
db.payHead = require("./payHead.model");
db.notices = require("./notices.model");


module.exports = db;