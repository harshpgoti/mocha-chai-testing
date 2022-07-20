const express = require("express");
const router = express.Router();
// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const { JWT_SECRET,bcrypt_hash } = require('../config/secret.json');

// const twitterOps = require("../models/twitterOps");
const twitterOpsController = require('../controllers/twitterOps');
const checkAuth = require('../middleware/checkAuth');


router.get("/alltweet", twitterOpsController.allTweet);

router.get("/allUsertweet", checkAuth, twitterOpsController.allUserTweet);

router.post("/addtweet", checkAuth, twitterOpsController.addTweet);

router.put("/updateTweet/:tweetid", checkAuth, twitterOpsController.updateTweet);

router.delete("/deletetweet/:tweetid", checkAuth, twitterOpsController.deleteTweet);

module.exports = router;