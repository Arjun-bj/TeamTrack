const asyncHandler = require("express-async-handler");

const validateToken = asyncHandler(async(req, res, next) => {
    if(req.session.accessToken) {
        // console.log(req.session.accessToken);
        next();
    } else {
        res.redirect("/");
        return res.status(401).json({ message: "User is not authorized" });
    }
});

module.exports = validateToken;