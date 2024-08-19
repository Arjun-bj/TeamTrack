const userModel = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const userServices = require("../services/userServices")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const { name } = require("ejs");

//OTP generator function
const generateOTP = () => {
    const otp = otpGenerator.generate(5, {
        digits: true,
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false
    });
    const expirationTime = new Date().getTime() + 5 * 60 * 1000; // 5 minutes from now 
    return {otp, expirationTime};
};

//Email sender function
const mailSender = (mailId, html, title) => {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });
    let mailDetails = {
        from: process.env.MAIL_ADDRESS,
        to: `${mailId}`,
        subject: title,
        html: html,
    };

    transporter.sendMail(mailDetails, (err) => {
        if(err) {
            console.log("failed to send mail", err);
        } else {
            console.log("Mail sended successfully");
        }
    });
}
//Register a user
//signUp funciton
/**
 * @author
 * @param
 * @returns
 */
// 
const registerUser = asyncHandler(async (req, res) => {
    console.log(req.body);
    const {username, email, password} = req.body;
    if(!username || !email || !password) {
        res.status(400).json({ message: "All fields are mandatory!"});
        return;
    }
    const userAvailable = await userModel.findOne({email});
    if(userAvailable) {
        res.status(400).json({ message: "User alredy exists."});
        return;
    }

    try {
        const {otp, expirationTime } = generateOTP();
        
        req.session.signupOTP = otp;
        req.session.signupOTPExpiration = expirationTime;
        req.session.userData = { username,email, password };
        // ExpirationTime = expirationTIme;
        // req.session.signupEmail = email;

        console.log("Session after setting OTP:", req.session);

        


        // res.render("otp");
        res.status(200).json({ message: "OTP sent to email. Please verify." });
    } catch (err) {
        res.status(401).json({message: err.message});
    }

});

//OTP verification
const otpVerification = asyncHandler(async (req, res) => {
    // Extract the OTP array from the request body
    const {value1, value2, value3, value4, value5} = req.body;
    console.log(req.body);
    const enteredOtp = `${value1}${value2}${value3}${value4}${value5}`;
    console.log(enteredOtp);

    // const enteredOtp = otpArray.join('');
    const sessionOtp = req.session.signupOTP;
    const sessionOtpExpiration = req.session.signupOTPExpiration;
    const userData = req.session.userData;

    // Check if the OTP and expiration time exist in the session
    if (!sessionOtp || !sessionOtpExpiration) {
        console.log("otp expiration");
        return res.status(400).json({ message: "OTP not found or expired!" });
    }

    // Compare the entered OTP with the OTP stored in the session
    if (enteredOtp !== sessionOtp) {
        return res.status(400).json({ message: "Invalid OTP!" });

    } 
    try {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const newUser = await userModel.create({
            username: userData.username,
            email: userData.email,
            password: hashedPassword,
        });
        console.log(`User created ${newUser}`);
        
        //clearing session data
        req.session.signupOTP = null;
        req.session.signupOTPExpiration = null;
        req.session.userData = null;
        res.status(201).json({message: "User created succesfully"});
    } catch (err) {
        res.status(400).json({ message: "User data is invalid" });
    } 
});

// Login user
//#route POST /api/users/login
const LoginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
        const accessToken = await userServices.loginUser(email, password);
        req.session.accessToken = accessToken;

        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


//logout
const logout = asyncHandler(async (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            console.error("Failed to logout:", err);
        } else {
            res.status(204).end();
            // res.redirect("/");
        }
    });
});

//verifyUserEmail,
module.exports = {registerUser,  LoginUser, logout, otpVerification };