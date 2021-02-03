const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const { check, body} = require("express-validator");

const express = require('express')
const app = express()
module.exports = [

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
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
      check("username", "Please Enter a Valid Username")
      .not()
      .isEmpty(),
      check("email", "Please enter a valid email").isEmail(),
      check("password", "Please enter a password with only numbers and text and at least 6 characters.").isLength({
          min: 6
      }).isAlphanumeric(),
      body('confirmPassword').custom((value, {req}) =>{
        if (value!== req.body.password){
          throw new Error('Password have to match')
        }
      })
  ],
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  ),

  app.post("/signin", controller.signin)
  ]