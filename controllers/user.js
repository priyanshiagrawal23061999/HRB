const { Collection } = require("mongoose")

// const {User} = require('./../models/user');
const mongoConnect = require('../services/mongodb')

exports.getUser = (req, res)=>{
console.log(req.body)
      // res.send(req.body)
      console.log(mongoConnect.Collection)

      mongoConnect.Collection.insertOne(req.body)
      .then(result => {
        console.log(result)
      })
      .catch(error => console.error(error))
}
