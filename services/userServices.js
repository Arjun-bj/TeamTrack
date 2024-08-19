const userController = require("../controllers/userController");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");

exports.loginUser = async (email, password) => {
    if (!email || !password) {
        throw new Error("All fields are mandatory");
    }

    const user = await userModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "20m" }
        );

        return accessToken;
    } else {
        throw new Error("Email or password is not valid");
    }
};

