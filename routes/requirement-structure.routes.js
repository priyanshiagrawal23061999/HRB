const { authJwt } = require("../middlewares");
const controller = require("../controllers/requirement-structure.controller")
const upload = require("../middlewares/upload");

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
  
  controller.fixInterview),
  router.get("/getInterviews", authJwt.verifyToken, controller.getSchedule),
  router.get("/editJob/:id", authJwt.verifyToken, controller.getVacancyById),
  router.get("/editSchedule/:id", authJwt.verifyToken, controller.getScheduleById),
  router.post("/apply",
    upload.upload, controller.postApply ),
 
 
]
