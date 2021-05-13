const calendarController = require("../controllers/event-calendar.controller");
const { authJwt } = require("../middlewares");

const express = require('express')
const app = express()

const router = express.Router();

module.exports =[
  router.get("/showEvents", authJwt.verifyToken, calendarController.showEvents),
  router.post("/postEvent", authJwt.corsMiddleware, authJwt.verifyToken, calendarController.addEvent),
  router.delete("/deleteEvent/:query", authJwt.verifyToken, calendarController.deleteEvent),
    
]
