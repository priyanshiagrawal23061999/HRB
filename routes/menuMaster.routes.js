const controller = require("../controllers/menuMaster.controller");

const express = require('express')
const app = express()

const router = express.Router();

module.exports =[
   
    router.post(
        '/insert',
        controller.insertEmployee
    ),

    router.get(
        '/show',
        controller.getEmployees
    ),

    
    router.get(
        '/search/:query',
        controller.searchEmployee
    ),
   
]
