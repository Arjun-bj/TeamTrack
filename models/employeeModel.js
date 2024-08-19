const mongoose = require("mongoose");
 
const employeeSchema = mongoose.Schema(
    {
        salutation: {type: String,required: [true, "Salutaion is required"]},
        firstName: {type: String,required: [true, "Firstname is required"]},
        lastName: {type: String,required: [true, "Lasttname is required"]},
        email: {type: String,required: [true, "Email is required"]},
        phone: {type: String,required: [true, "Phone number is required"]},
        dob: {type: String,required: [true, "Date of birth is required"]},
        qualifications: {type: String,required: [true, "Qualification is required"]},
        gender: {type: String,required: [true, "Gender is required"]},
        address: {type: String,required: [true, "Address is required"]},
        country: {type: String,required: [true, "Country is required"]},
        state: {type: String,required: [true, "State is required"]},
        city: {type: String,required: [true, "City is required"]},
        pin: {type: String,required: [true, "Pin number is required"]},
        username: {type: String,required: [true, "Usernsme is required"]},
        password: {type: String,required: [true, "Password is required"]},
        avatar :{type:String,default: "default-avatar.jpg",},
    },
{
    timestamps: true,
}
);
const employeeModel = mongoose.model("employees",employeeSchema);
module.exports = employeeModel;