const { authJwt } = require("../middlewares");
const controller = require("../controllers/requirement-structure.controller")
const express = require('express')
const app = express()
const { check } = require("express-validator");

const router = express.Router();

module.exports =[
  router.post("/addJobVacancy", authJwt.verifyToken, controller.insertJobVacancy),
  router.get("/getJobVacancy",  controller.getJobVacancy),
  router.post("/fixInterview", 
  check("Vacancy", "Please Enter a Valid Vacancy").not().isEmpty().isEmail(),
  check("Candidate", "Please Enter a Valid Email").not().isEmpty(),
  check("InterviewTime", "Please Enter a Valid Time").not().isEmpty(),
  check("Date", "Please Enter a Valid Date").not().isEmpty(),
  check("Method", "Please Enter a Valid Method").not().isEmpty(),
  check("Status", "Please Enter a Valid Status").not().isEmpty(),
  
  controller.fixInterview)
]
