const express = require("express");
const router = express.Router();
const twitterOpsController = require('../controllers/twitterOps');
const checkAuth = require('../middleware/checkAuth');


router.get("/alltweet", twitterOpsController.allTweet);

router.get("/allUsertweet", checkAuth, twitterOpsController.allUserTweet);

router.post("/addtweet", checkAuth, twitterOpsController.addTweet);

router.put("/updateTweet/:tweetid", checkAuth, twitterOpsController.updateTweet);

router.delete("/deletetweet/:tweetid", checkAuth, twitterOpsController.deleteTweet);

module.exports = router;