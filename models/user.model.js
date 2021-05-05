const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const UserSchema =  new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: "Your email is required",
    trim: true,
  },
  username: {
    type: String,
    unique: true,
    required: "Your username is required",
  },
  password: {
    type: String,
    required: "Your password is required",
    max: 100,
  },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: String,
    enum: ["Pending", "Active"],
    default: "Pending",
  },
  confirmationCode: {
    type: String,
    unique: true,
  },
  resetPasswordToken: {
    type: String,
    required: false,
  },
  resetPasswordExpires: {
    type: Date,
    required: false,
  },
  authorized:{
    type : Boolean,
    default : false,
  }
})

UserSchema.methods.generatePasswordReset = function() {
  this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

mongoose.set('useFindAndModify', false);
module.exports = mongoose.model(
  "User", UserSchema
);
