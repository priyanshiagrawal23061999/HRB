const config = require("../config/auth.config");
const nodemailer = require("../config/nodemailer.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const e = require("express");

exports.signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array(),
    });
  }
  const { password, email } = req.body;

  try {
    const payload = {
      user: {
        email: email,
      },
    };

    jwt.sign(
      payload,
      "randomString",
      {
        expiresIn: 10000,
      },
      (err, token) => {
        if (err) throw err;
        user.confirmationCode = token;
      }
    );

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save((err, user) => {
      if (req.body.roles) {
        Role.find(
          {
            name: { $in: req.body.roles },
          },
          (err, roles) => {
            if (err) {
              return res.status(500).send({ message: err });
            }

            user.roles = roles.map((role) => role._id);
            user.save((err) => {
              if (err) {
                return res.status(500).send({ message: err });
              }

              return res.send({
                message:
                  "User registered successfull! Now verify your Email by clicking on the link send to your email.",
              });
            });
          }
        );
      } else {
        Role.findOne({ name: "user" }, (err, role) => {
          if (err) {
            return res.status(500).send({ message: err });
          }

          user.roles = [role._id];
          user.save((err) => {
            if (err) {
              return res.status(500).send({ message: err });
            }

            return res.send({
              message:
                "User registered successfull! Now verify your Email by clicking on the link send to your email.",
            });
          });
        });
      }
    });
    nodemailer.sendConfirmationEmail(
      user.email,
      (user.subject = "Please confirm your account"),
      (body = `<h1>Email Confirmation</h1>
      <h2>Hello ${user.username}</h2>
      <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
      <a href=http://localhost:4200/auth/verifyuser?confirmationCode=${user.confirmationCode}> Click here</a>
      </div>`)
    );
  } catch (err) {
    res.status(500).send("Error in Saving");
  }
};

exports.signin = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array(),
    });
  }

  User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      if (user.status != "Active") {
        return res.status(401).send({
          message: "Pending Account. Please Verify Your Email!",
        });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token,
      });
    });
};

exports.verifyUser = async (req, res) => {
  User.findOne({
    confirmationCode: req.params.confirmationCode,
  })
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ danger: "User Not found. Invalid Confirmation Code." });
      }
      if (user.status == "Active") {
        return res.status(200).send({ warning: "Email is already Verified!." });
      }

      user.status = "Active";
      user.save((err) => {
        if (err) {
          throw e;
        }
        return res
          .status(200)
          .send({ success: "Email verified successfully!s" });
      });
    })
    .catch((e) => res.status(500).send({ message: e }));
};

exports.recover = async (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    try {
      if (user.status === "Pending"){
        return res.status(401).json({
          message : "Please verify your email first!"
        })
      }
      if (!user)
        return res.status(401).json({
          message:
            "The email address " +
            req.body.email +
            " is not associated with any account. Double-check your email address and try again.",
        });

      user.generatePasswordReset();

      user.save((err, user) => {
        let link = `http://127.0.0.1:4200/auth/resetPassword?token=${user.resetPasswordToken}`;
        nodemailer.sendConfirmationEmail(
          req.body.email,
          (user.subject = "Password change request"),
          (body = `<h2>Hello ${user.username}</h2>
        <p>Thank you for subscribing. Please <a href=${link}> Click here</a> to reset your password.</p>
        <p>  If you did not request this, please ignore this email and your password will remain unchanged.\n</p>
        </div>`)
        );
      });
      return res
        .status(200)
        .json({
          message: "Check your mail, we have set you reset password link",
        });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  });
};

exports.resetPassword = (req, res) => {
  try {

    const { password, confirmPassword } = req.body
    User.findOne({
      resetPasswordToken: req.body.token,
      resetPasswordExpires: { $gt: Date.now() },
    }).exec((err, user) => {
      if (!user)
        return res
          .status(401)
          .json({ message: "Password reset token is invalid or has expired." });

      //Set the new password
      bcrypt.genSalt(10,(err, salt) =>{
        if(err) throw err;
        bcrypt.hash(password, salt,function(err, hash){
          if (err) throw err;
          user.password = hash;
          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;
    
          user.save((err, user) => {
            if (err) return res.status(500).json({ message: err.message });
    
            nodemailer.sendConfirmationEmail(
              user.email,
              (user.subject = "Your password has been changed"),
              (body = `<h2>Hello ${user.username}</h2>
                <p> This is a confirmation that the password for your account ${user.email} has just been changed.</p>
                </div>`)
            );
    
            return res
              .status(200)
              .json({ message: "Your password has been updated." });
          });
        });
      });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
