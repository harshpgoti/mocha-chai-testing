const express = require("express");
const router = express.Router();
const walletController = require('../controllers/wallet')
const checkAuth = require('../middleware/checkAuth');

router.post("/addBalance", checkAuth, walletController.addBalance);

router.post("/buyStock", checkAuth, walletController.buyStock);

router.post("/sellStock", checkAuth, walletController.sellStock);

router.get("/userPortfolio", checkAuth, walletController.userPortfolio);

module.exports = router;