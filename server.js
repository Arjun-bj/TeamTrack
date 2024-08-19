const express =require("express");
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const  mongoose = require('mongoose');
const session =require('express-session');
const errorHandler = require("./middleware/errorHandler");
const {sessionData} = require("./config/authentication");
const connectDb = require("./config/dbConnection");
const ejs = require("ejs");
const path = require("path");
dotenv.config();
connectDb();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// app.use(express.json());
app.use(sessionData);
app.use("/api/users", require("./routes/userRoutes"));
app.use("/employees", require("./routes/employeeRoutes"));
app.use("",require("./routes/routes"))
app.use(errorHandler);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//styles........................................
app.use("/css",express.static(path.resolve(__dirname,"assets/css")))
app.use("/js",express.static(path.resolve(__dirname,"assets/js")))
app.use("/img",express.static(path.resolve(__dirname,"assets/img")))
app.use("/uploads",express.static(path.resolve(__dirname,"uploads")))


app.listen(PORT, ()=>{
   console.log(`Server Started at : http://localhost:${PORT} `); 
}) 
