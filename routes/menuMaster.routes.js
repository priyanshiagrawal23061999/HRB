const controller = require("../controllers/menuMaster.controller");
const { authJwt } = require("../middlewares");
const { check } = require("express-validator");
const express = require("express");
const app = express();

const router = express.Router();

module.exports = [
  router.post(
    "/insert",
    authJwt.verifyToken,
    check("EmployeeName", "Please Enter your Valid Employeename")
      .not()
      .isEmpty(),
    check("Email", "Please Enter a Valid Email").not().isEmpty().isEmail(),
    check("Company", "Please Enter a Valid Company").not().isEmpty(),
    check("Department", "Please Enter a Valid Department").not().isEmpty(),
    check("Designation", "Please Enter your Designation").not().isEmpty(),
    check("ReportingTo", "Please Enter whoom to Report").not().isEmpty(),
    check("EmploymentType", "Please Enter your EmploymentType").not().isEmpty(),
    check("WorkType", "Please Enter your WorkType").not().isEmpty(),
    check("DOB", "Please Enter your DOB").not().isEmpty(),
    check("OfficeBranch", "Please Enter your Office Branch").not().isEmpty(),
    check("JoiningDate", "Please Enter your Joining Date").not().isEmpty(),
    check("EmployeeGrade", "Please Enter your Employee Grade").not().isEmpty(),
    check("EmployeeGroup", "Please Enter your Employee Group").not().isEmpty(),
    check("EmployeeType", "Please Enter your Employee Type").not().isEmpty(),
    check("Value", "Please Enter your Value").not().isEmpty(),
    check("PF", "Please Enter your PF Account No.").not().isEmpty(),
    check("ESI", "Please Enter your ESI No.").not().isEmpty(),
    check("CIN", "Please Enter your CIN No.").not().isEmpty(),
    check("Address", "Please Enter your Address").not().isEmpty(),
    check("EffectiveDate", "Please Enter your Effective Date").not().isEmpty(),
    check("Description", "Please Tell us Something About Yourself")
      .not()
      .isEmpty(),
    check("ContactName", "Please Enter your Emergency Contact Name")
      .not()
      .isEmpty(),
    check("ContactMobile", "Please Enter your Emergency Contact Mobile No.")
      .not()
      .isEmpty().isMobilePhone(),
    check("ContactEmail", "Please Enter your Emergency Contact Email")
      .not()
      .isEmpty().isEmail(),
    check("ContactAddress", "Please Enter your Emergency Contact Address")
      .not()
      .isEmpty(),

    controller.insertEmployee
  ),

  router.get("/show", authJwt.verifyToken, controller.getEmployees),

  router.get("/emp/:id", authJwt.verifyToken, controller.getEmployeeById),
  router.get("/search/:query", authJwt.verifyToken, controller.searchEmployee),
  router.get("/empName/:department", authJwt.verifyToken, controller.getEmployeeName),
  router.get("/department", authJwt.verifyToken, controller.getDepartment),

];
