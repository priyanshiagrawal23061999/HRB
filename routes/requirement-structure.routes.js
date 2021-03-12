const { authJwt } = require("../middlewares");
const controller = require("../controllers/requirement-structure.controller")
const express = require('express')
const app = express()

const router = express.Router();

module.exports =[
  router.post("/addJobVacancy", authJwt.verifyToken, controller.insertJobVacancy),
  router.get("/getJobVacancy",  controller.getJobVacancy),
  router.post("/fixInterview", controller.fixInterview)
]
