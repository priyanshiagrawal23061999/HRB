const trainingController = require("../controllers/training.controller");
const { authJwt } = require("../middlewares");

const express = require('express')
const app = express()

const router = express.Router();

module.exports =[
  router.put("/addFeedback",  trainingController.addFeedback),
    
]