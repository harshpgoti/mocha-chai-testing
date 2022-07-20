const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET,bcrypt_hash } = require('../config/secret.json');
const request = require('request');

const Wallet = require("../models/wallet");
const Portfolio = require("../models/portfolio");

exports.addBalance = (req, res, next) => {
    const {amount} = req.body;
    const {email,userId} = req.userData;

    if(!amount || amount == 0){
      return res.status(400).json({
        error: "please enter all fields"
      });
    } else{
        Wallet.find({email,userId})
        .exec()
        .then(userWallet => {
            if(userWallet[0] != undefined){
                Wallet.updateOne({ email,userId }, { balance: userWallet[0].balance+amount })
                .exec()
                .then(result => {
                    return res.status(200).json({ message: 'balance updated successfully' });
                })
                .catch(err => {
                    return res.status(500).json({
                        error: err
                    });
                });
            } else {
                const balance = new Wallet({
                    _id: new mongoose.Types.ObjectId(),
                    email: email,
                    userId: userId,
                    balance: amount,
                });
                balance
                    .save()
                    .then(result => {
                        res.status(200).json({
                            message: "balance added successfully",
                            result
                        });
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        });
                    });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });

      }
}

exports.buyStock = (req, res, next) => {
    const {stockName, numberOfStock} = req.body;
    const {email,userId} = req.userData;
    
    request(`https://financialmodelingprep.com/api/v3/discounted-cash-flow/${stockName}?apikey=2959e91e2b6c424ca15a5372ce3e338e`, { json: true }, (err, response, body) => {
        if (err) { return res.status(500).json({ error: err }); }
        
        Wallet.find({email,userId})
        .exec()
        .then(userWallet => {
            let totalBuyAmount= body[0]['Stock Price']*numberOfStock.toFixed(2);
            let totalBalance= userWallet[0].balance.toFixed(2);
            let symbol = body[0].symbol;
            if(totalBuyAmount <= totalBalance){

                Portfolio.find({email:email,userId:userId,symbol:symbol})
                .exec()
                .then(ports => {
                    if(ports[0] != undefined){

                        Portfolio.updateOne({ email:email,userId:userId,symbol:symbol }, { totalStock: ports[0].totalStock+numberOfStock })
                        .exec()
                        .then(result => {
                            Wallet.updateOne({ email,userId }, { balance: (totalBalance-totalBuyAmount).toFixed(2) })
                            .exec()
                            .then(result => {
                                return res.status(200).json({ message: 'stocks buy successfully' });
                            })
                            .catch(err => {
                                return res.status(500).json({
                                    error: err
                                });
                            });
                        })
                        .catch(err => {
                            return res.status(500).json({
                                error: err
                            });
                        });
                    } else {
                        let newStokes = new Portfolio({
                            _id: new mongoose.Types.ObjectId(),
                            email: email,
                            userId: userId,
                            symbol: body[0].symbol,
                            totalStock: numberOfStock,
                        });
                        newStokes
                        .save()
                        .then(result => {
                            Wallet.updateOne({ email:email,userId:userId }, { balance: (totalBalance-totalBuyAmount).toFixed(2) })
                            .exec()
                            .then(result => {
                                return res.status(200).json({ message: 'stocks buy successfully' });
                            })
                            .catch(err => {
                                return res.status(500).json({
                                    error: err
                                });
                            });
                        })
                        .catch(err => {
                            res.status(500).json({
                                error: err
                            });
                        });
                    }
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
            } else{
                 res.status(500).json({ error: "wallet balance insufficient" });
            }
        });
    });
}

exports.sellStock = (req, res, next) => {
    const {stockName, numberOfStock} = req.body;
    const {email,userId} = req.userData;
    
    request(`https://financialmodelingprep.com/api/v3/discounted-cash-flow/${stockName}?apikey=2959e91e2b6c424ca15a5372ce3e338e`, { json: true }, (err, response, body) => {
        if (err) { return res.status(500).json({ error: err }); }
        if (body.length == 0) { return res.status(500).json({ error: "invalid symbol" }); }
        
        let totalSellAmount= body[0]['Stock Price']*numberOfStock.toFixed(2);
        let symbol = body[0].symbol;

            Portfolio.find({email:email,userId:userId,symbol:symbol})
            .exec()
            .then(ports => {
                if(ports[0] != undefined && ports[0].totalStock >= numberOfStock){

                    Portfolio.updateOne({ email:email,userId:userId,symbol:symbol }, { totalStock: ports[0].totalStock-numberOfStock })
                    .exec()
                    .then(result => {

                        Wallet.find({email,userId})
                        .exec()
                        .then(userWallet => {
                            let newBalance= userWallet[0].balance+totalSellAmount;
                            Wallet.updateOne({ email,userId }, { balance: newBalance })
                            .exec()
                            .then(result => {
                                return res.status(200).json({ message: 'stocks sell successfully' });
                            })
                            .catch(err => {
                                return res.status(500).json({
                                    error: err
                                });
                            });
                        })
                        .catch(err => {
                            return res.status(500).json({
                                error: err
                            });
                        });
                    })
                    .catch(err => {
                        return res.status(500).json({
                            error: err
                        });
                    });
                } else {
                    return res.status(500).json({
                        error: "insufficient stocks"
                    });
                }
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
    });

}

exports.userPortfolio = (req, res, next) => {
    const {email,userId} = req.userData;
    
    Portfolio.find({email:email,userId:userId})
    .exec()
    .then(ports => {
        console.log(ports);
        res.status(200).json({
            ports
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}