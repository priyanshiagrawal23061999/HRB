const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const { check, body } = require("express-validator");

const express = require("express");
const app = express();
module.exports = [
  app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization"
    );
    next();
  }),

  /**
   * @method - POST
   * @param - /signup
   * @description - User SignUp
   */

  app.post(
    "/signup",
    [
      check("username", "Please Enter a Valid Username").not().isEmpty(),
      check("email", "Please enter a valid email").isEmail(),
      check("password")
        .not()
        .isEmpty()
        .isLength({ min: 6 })
        .withMessage("Must be at least 6 chars long"),
      check("confirmPassword").custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Password have to match");
        }
        return true;
      }),
    ],
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup
  ),

  app.post(
    "/signin",
    [
      check("username", "Please Enter a Valid Username").not().isEmpty(),
      check(
        "password",
        "Please enter a password with only numbers and text and at least 6 characters."
      )
        .isLength({
          min: 6,
        }),
    ],
    controller.signin
  ),

  app.get("/verifyuser/:confirmationCode", controller.verifyUser),

  app.post(
    "/recover",
    [
      check("email","Please Enter a valid email address")
        .isEmail(),    ],
    controller.recover
  ),

  app.post(
    "/reset/:token",
    [
      (check("password","Must be at least 6 chars long")
        .not()
        .isEmpty()
        .isLength({ min: 6 }),
      check("confirmPassword", "Passwords do not match").custom(
        (value, { req }) => {
          if (value !== req.body.password) {
            throw new Error("Password have to match");
          }
          return true;
        }
      ))
    ],
    controller.resetPassword
  ),
];
