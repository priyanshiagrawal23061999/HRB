const controller = require("../controllers/hrRoles.controller");

const express = require('express')
const app = express()

const router = express.Router();

module.exports =[
    router.get(
        "/",
        controller.getHrRoles
    ),
    router.post(
        '/insert',
        controller.insertHrRoles
    )
]
