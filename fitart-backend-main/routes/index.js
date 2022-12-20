var express = require('express');
var router = express.Router();


const mongoose = require("mongoose");

//connecting database to the backend 
mongoose.connect("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//create schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password:String
});

const User = mongoose.model("User", UserSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("welcome to backend, hello ");
});

router.post("/login",function(req,res){
  (loginUser = req.body.email), (password = req.body.password);
  
  User.findOne({email: loginUser }, function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        if (foundUser.password === password) {
          res.status(200).send({
                  message:"successfull login"
                })
        }else{
               res.status(200).send({
        message:"password incorrect"
      })
        }
      } else {
   res.status(200).send({
      message:"user not found"
    })
      }
    }
  });
 })

router.post("/signup",function(req,res){
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password:req.body.password
  });
  console.log(newUser);
  (loginUser = req.body.email), (password = req.body.password);
  
  User.findOne({email: loginUser }, function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        res.status(200).send({
                message:"already registered"
              })
      } else {
       
  newUser.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      
      res.status(200).send({
        message:"registered"
      })
    }
  });
      }
    }
  });
  
  
})

module.exports = router;
