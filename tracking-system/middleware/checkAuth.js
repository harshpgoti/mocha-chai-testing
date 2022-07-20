const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/secret.json');
const User = require("../models/user");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userData = decoded;
        let {email} = decoded;

        User.find( {email} )
        .exec()
        .then(user => {
            if(!user[0]){
                return res.status(401).json({
                    error: 'Auth failed user not available'
                });
            }
        })
        .catch(err => {
            return res.status(401).json({
              error: err
            });
        });
        next();
    } catch (error) {
        return res.status(401).json({
            error: error
        });
    }
};