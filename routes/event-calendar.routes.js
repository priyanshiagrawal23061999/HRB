const calendarController = require("../controllers/event-calendar.controller");
const { authJwt } = require("../middlewares");

const express = require('express')
const app = express()

const router = express.Router();

module.exports =[
  router.get("/showEvents", authJwt.verifyToken),
  router.post("/postEvent", authJwt.verifyToken, calendarController.addEvent),
    
]
