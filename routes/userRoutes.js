
const express = require("express");
const { registerUser, LoginUser, logout, otpVerification } = require("../controllers/userController");
const router = express.Router();

router.post("/register",registerUser); 
router.post("/login", LoginUser);
router.post("/logout", logout);
router.post("/otp", otpVerification);

module.exports = router;