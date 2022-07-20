const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET,bcrypt_hash } = require('../config/secret.json');

const twitterOps = require("../models/twitterOps");
const User = require("../models/user");


exports.allTweet = (req, res, next) => {

    twitterOps.find()
    .exec()
    .then(tweet => {
        res.status(200).json({
            tweet
        });
    })
    .catch(err => {
        res.status(401).json({
            error: "Auth failed"
        });
    });

}

exports.allUserTweet = (req, res, next) => {

    const {email,userId} = req.userData;

    twitterOps.find({email})
    .exec()
    .then(tweet => {
        res.status(200).json({
            tweet
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
    
}

exports.addTweet = (req, res, next) => {
    const {content} = req.body;
    const {email,userId} = req.userData;
    if(!content){
        return res.status(404).json({
            error: "please enter all fields"
        });
    } else{
        const tweet = new twitterOps({
            _id: new mongoose.Types.ObjectId(),
            content: content,
            email: email
        });
        tweet
            .save()
            .then(result => {
                res.status(200).json({
                    message: "Created product successfully",
                    id:result._id
                });
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
    }
    
}

exports.updateTweet = (req, res, next) => {
    const id = req.params.tweetid;
    const {content} = req.body;
    const {email,userId} = req.userData;

    twitterOps.updateOne({ _id: id,email: email }, { content: content })
        .exec()
        .then(result => {
            if(result.matchedCount == 0){
                return res.status(404).json({ error: 'tweet not available' });
            }
            res.status(200).json({ message: 'tweet updated' });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
  
exports.deleteTweet = (req, res, next) => {
    const id = req.params.tweetid;
    const {email,userId} = req.userData;

    twitterOps.deleteOne({ _id: id,email: email })
    .exec()
    .then(result => {
        if(result.deletedCount == 0){
            return res.status(404).json({ message: 'tweet not available' });
        }
        res.status(200).json({
            message: 'tweet deleted',result
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
        
};
  