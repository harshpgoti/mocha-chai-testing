const express = require("express");
const router = express.Router();
// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const { JWT_SECRET,bcrypt_hash } = require('../config/secret.json');

// const User = require("../models/user");
const userController = require('../controllers/user')

router.post("/signup", userController.signup);

router.post("/signin", userController.signin);

module.exports = router;