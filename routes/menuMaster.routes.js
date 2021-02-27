const controller = require("../controllers/menuMaster.controller");
const { authJwt } = require("../middlewares");

const express = require('express')
const app = express()

const router = express.Router();

module.exports =[
   
    router.post(
        '/insert',
        authJwt.verifyToken,
        controller.insertEmployee
    ),

    router.get(
        '/show',
        authJwt.verifyToken,
        controller.getEmployees
    ),

    router.get(
        '/emp/:id',
        authJwt.verifyToken,
        controller.getEmployeeById
    ),
    router.get(
        '/search/:query',
        authJwt.verifyToken,
        controller.searchEmployee
    ),
    router.get(
        '/empName',
        authJwt.verifyToken,
        controller.getEmployeeName
    )
]
