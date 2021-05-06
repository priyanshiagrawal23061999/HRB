const mongoose = require("mongoose");

const Leave = mongoose.model(
  "Leave",
  new mongoose.Schema({
    EmployeeId: String,
    Details: { type: String, max: 100 },
    LeaveType: String,
    Approver: String,
    AvailableLeaves: Number,
    FromDate: Date,
    ToDate: String,
    status: {
      type: String,
      enum: ["Pending", "Active"],
      default: "Pending",
    },
    ApprovalDate: Date,
    Active: Boolean,
    CreatedAt: Date,
  })
);

module.exports = Leave;
