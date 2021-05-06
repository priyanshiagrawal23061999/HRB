const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file)
    cb(null, __basedir + "/resources/static/assets/uploads/");
  },
  filename: (req, file, cb) => {
    console.log("middleware line 10",file.originalname);
    cb(null, file.originalname);
  },
});

exports.upload = multer({storage: storage,
  limits: { fileSize: maxSize },}).single("file");
