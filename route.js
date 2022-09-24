const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const bodyparser=require("body-parser")
const User = require("../models/model");

router.post("/signup", (req, res, next) => {
    User.find({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        email: req.body.email,
        img_url:req.body.img_url
    })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              phone: req.body.phone,
              email: req.body.email,
              img_url:req.body.img_url,
              password: hash
            });
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "User created"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
});


router.post("/login", (req, res, next) => {
    User.find({
      email: req.body.email
      
    
    })
      .exec()
      .then(user => {
        if (user.length < 1) {
                 
          return res.status(401).json({
            messege: "Auth failed"
                    
                      
                      
          })
        }
      
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
                    
            return res.status(401).json({
              messege: "Auth failed",
             
                     
                          
            });
          }
          if (result) {
         
            return res.status(200).send(user
             //  messege: "Auth successful"
              
                
                
            
            );
            
           
          }
                
          return res.status(401).json({
            messege: "Auth failed"
                   
                    
          })
        }
             
        )
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
         
     
           
      })
  })
module.exports = router;