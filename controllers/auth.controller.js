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

              return res.send({ message: "User registered successfull! Now verify your Email by clicking on the link send to your email." });
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

            return res.send({ message: "User registered successfull! Now verify your Email by clicking on the link send to your email." });
          });
        });
      }
    });
    nodemailer.sendConfirmationEmail(
      user.username,
      user.email,
      user.confirmationCode,
    );
  } catch (err) {
    console.log(err.message);
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
      console.log(user)
      if (!user) {
        return res.status(404).send({ danger: "User Not found. Invalid Confirmation Code." });
      }
      if (user.status == "Active"){
        return res.status(200).send({warning : "Email is already Verified!."})
      }

      user.status = "Active";
      user.save((err) => {
        if (err) {
          throw e;
        }
        return res.status(200).send({ success : "Email verified successfully!s"})
      });
    })
    .catch((e) => res.status(500).send({ message: e }));
};
