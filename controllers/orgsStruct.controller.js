const db = require("../models");
const mongoose = require("mongoose");
const e = require("cors");

const PayHead = db.payHead;
const notices = db.notices;

exports.insertPayHead = (req, res) => {
  console.log(req.body);
  // notices.insertOne()
  res.status(200).send("Success!");
};
exports.getPayHead = (req, res) => {};

exports.insertNotices = (req, res) => {
  const notice = new notices({
    Title: req.body.title,
    Description: req.body.description,
    NoticeDate: req.body.noticeDate,
  });
  console.log(notice);
  notice.save((err, data) => {
    if (data) {
      return res.status(201).send({ message: "Your notice has been added successfully!!" });
    }
    if (err) {
      return res.status(500).send({ message: "Internal Server Error" });
    }
  });
};
exports.getNotices = (req, res) => {
    console.log(new Date())
    notices.find({NoticeDate:new Date()})
    .then((data) => {
        return res.status(200).send(data);
      })
      .catch((err) => {
        return res.status(500).send({message: "Internal Server Error"});
      });
};
