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
      return res
        .status(201)
        .send({ message: "Your notice has been added successfully!!" });
    }
    if (err) {
      return res.status(500).send({ message: "Internal Server Error" });
    }
  });
};
exports.getNotices = (req, res) => {
  let today = new Date();
  let nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + 30);
  console.log(nextDate);
  notices
    .find({
      NoticeDate: {
        $lte: Date("2021-05-15T00:00:00.000Z"),
        // $lt: Date("2021-06-14T00:00:00.000Z")
      },
    })
    .sort({ NoticeDate: "asc" })
    .then((data) => {
      console.log(data);
      return res.status(200).send(data);
    })
    .catch((err) => {
      return res.status(500).send({ message: "Internal Server Error" });
    });
};
