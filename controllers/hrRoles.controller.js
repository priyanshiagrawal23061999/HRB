const db = require("../models");

const HrRoles = db.hrRoles;

exports.getHrRoles = (req, res) =>{
    HrRoles.find({},['title','iconName'],(err, docs) =>{
        if (err){
            res.status(500).send(err)
        }
        if (docs){
            res.send(docs)
        }
    })
}

exports.insertHrRoles = (req, res) =>{
    console.log(req.body)
    HrRoles.insertMany(req.body).then(function(){ 
        res.send('inserted') // Success 
    }).catch(function(error){ 
        console.log(error)      // Failure 
    }); 
}