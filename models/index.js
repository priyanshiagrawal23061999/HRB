const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.hrRoles = require("./hrRoles.model")
db.employees = require("./employees.model")
db.calendar = require("./event-calendar.model")
db.ROLES = ["user", "admin", "moderator"];

module.exports = db;