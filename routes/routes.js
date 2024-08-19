const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/tokenHandler");
const {registerUser, LoginUser} =require("../controllers/userController");

router.get("/", (req, res) => {
    res.render("index", {title: "Signin Page",});
});

//user registration route
router.post("/register", registerUser);

//user login route
router.post("/login", LoginUser,);

//dashboard
router.get("/home", validateToken, (req, res) => {
    res.render("main", {title: "Home Page",});
});

//employeedetails
router.get("/view", validateToken, (req, res) => {
    res.render("view", {title: "Employee details"});
});

//otp verification
router.get("/otp", (req, res) => {
    res.render("otp", {title: "Otp"});
});

module.exports = router;