const db = require("../models");
const mongoose = require("mongoose");

const Training = db.training;


exports.addFeedback = (req, res) =>{
    console.log(req.body)
    console.log(req.params.id)
    id = req.params.id
    NEW_COMMENT = req.body
    Training.updateOne( 
      { _id : mongoose.Types.ObjectId(`${id}`) },
      { $push: { Feedback: NEW_COMMENT } }
    ).then(function(){ 
        res.send({message: 'inserted'}) // Success 
    }).catch(function(error){ 
        console.log(error)      // Failure 
    }); 
}

exports.addTraining = (req, res) => {
    console.log(req.body)
    Training.insertMany(req.body).then(() => {
        return res.status(200).send({ message: "Successfully Saved!" });
  
      }).catch((err) =>{
        console.log(err)
        return res.status(500).json({
          message: "Error!!! Try Again"
        })
      })
}

exports.getTrainings = (req, res) => {
  Training.find({}, function (err, training) {
    if (err){
      return res.send(500).send({message : err.message});
    }
    else{
        console.log(training)
    res.send(training);
    }
  });   
}

exports.getFeedbacks = (req, res) => {
  console.log(req.params.id)
  id = req.params.id
  Training.find({_id : mongoose.Types.ObjectId(`${id}`)}, {Feedback: 1}, 
  function(err, feed){
    if(err){
      returnres.send(500).send({message: err.message})
    }
    else{
      res.send(feed)
    }
  })
}

