const { authJwt } = require("../middlewares");
const controller = require("../controllers/orgsStruct.controller")
const express = require('express')
const app = express()
const { check } = require("express-validator");

const router = express.Router();

module.exports =[
    router.post("/addPayHead",   check("Vacancy", "Please Enter a Valid Vacancy").not().isEmpty().isEmail(),
    check("PayHead", "Required* field PayHead").not().isEmpty(),
    check("Type", "Required* field Type").not().isEmpty(),
    check("ShortCode", "Required* field ShortCode").not().isEmpty(),
    check("CalculatedType", "Required* field CalculatedType").not().isEmpty(),
    check("Value", "Please Enter a Valid Value").not().isEmpty().isNumeric(),
     authJwt.verifyToken, controller.insertPayHead),

    router.get("/getPayHead", authJwt.verifyToken, controller.getPayHead),

    router.post("/insertNotice",authJwt.verifyToken, controller.insertNotices),
    router.get("/getNotice",authJwt.verifyToken, controller.getNotices)

]