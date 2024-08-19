
const session = require("express-session");
const sessionData = session({
    secret: "eefe-ewew-fdbn",
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 5 * 60 * 1000}
});

module.exports = {sessionData};