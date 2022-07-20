const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET,bcrypt_hash } = require('../config/secret.json');

const User = require("../models/user");

exports.signin = (req, res, next) => {
    const {email,password} = req.body;
    if(!email || !password){
      return res.status(400).json({
        error: "please enter all fields"
      });
    } else{
      User.find({ email })
        .exec()
        .then(user => {
          if (user.length < 1) {
            return res.status(401).json({
              message: "Auth failed"
            });
          }
          bcrypt.compare(password, user[0].password, (err, result) => {
            if (err) {
              return res.status(401).json({
                message: "Auth failed"
              });
            }
            if (result) {
              const token = jwt.sign(
                {
                  email: user[0].email,
                  userId: user[0]._id
                },
                JWT_SECRET,
                {
                    expiresIn: "1h"
                }
              );
              return res.status(200).json({
                message: "Auth successful",
                token: token
              });
            }
            res.status(401).json({
              message: "Auth failed"
            });
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
      }
}