const asyncHandler = require("express-async-handler");
const employeeModel = require("../models/employeeModel");
const employeeServices = require("../services/employeeServices");

// Get all employees
//#route GET /api/employees
const getEmployees = asyncHandler(async (req, res) =>{
    const allEmployees = await employeeModel.find();
    res.status(200).json(allEmployees);
});

// Create New employee
//#route POST /api/employees/create
const createEmployee = async (req, res) => {
    console.log(req.body);

    try {
        const newEmployee = {
        salutation : req.body.salutation,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        phone : req.body.phone,
        dob : req.body.dob,
        qualifications : req.body.qualifications,
        gender : req.body.gender,
        address : req.body.address,
        country : req.body.country,
        state : req.body.state,
        city : req.body.city,
        pin : req.body.pin,
        username : req.body.username,
        password : req.body.password
        }; 
        let result = await employeeServices.createEmployee(newEmployee);

        console.log(result);
    
        if(result) {
            res.status(201).json({
                status: "success",
                data: result.id,
                message: "Employee created successfully",
            });
        }
    }catch(err) {
        res.status(400).json({
            status: "failed",
            message: "Employee creation failed",
        });
    }
};

const Avatar = async(req, res) => {
    const id = req.params.id;
    console.log(id);
    // const employe = await employeeModel.findById(id);
    // const {avatar} = employe;
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    try {
        await employeeModel.updateOne({_id : id}, {
            avatar : `${req.file.filename}`
        });
        res.status(200).send(`File uploaded successfully: ${req.file.filename}`);
    }catch (err) {
        console.log(err);
        res.status(500).send('An error occurred while updating the avatar.');
    }
}

//find employee with id
//#route GET /api/employees/:id
const getEmployee = (async (req, res) =>{
    const result = await employeeServices.getEmployee(req.params.id)
    if(!result) {
        res.status(404);
        throw new Error("Employee not found"); 
    } 
    res.status(200).json(result);
});

//Search and Pagination
const paginationSearch = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit); // extracts pagination and search parameters from the query string
      console.log(limit);
      const search = req.query.search || '';
    //   console.log(search);
  
      const { data, totalDatas, totalPages, searchResult } = await employeeServices.paginationSearch(page, limit, search);
        // calls paginationSearch function from service
      return res.status(200).json({
        success: true,
        message: "employeeData",
        data: data,
        page,
        totalPages,
        totalDatas,
        searchResult
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }
  };
  

//Edit employee
//#route PUT /api/employees/:id
const updateEmployee = asyncHandler(async (req, res) =>{
    const employeeId = await employeeModel.findById(req.params.id);
    
    if(!employeeId) {
        res.status(404);
        throw new Error("Employee not found");
    }
try {
    const udatedEmployee = await employeeModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {useFindAndModify:false}
    );
    // console.log(updateEmployee);
    res.status(200).json(udatedEmployee);
}catch(err){
    console.log(err)
}
 
});


// Delete employee
//#route DELETE /api/employees/:id
const deleteEmployee = asyncHandler(async (req, res) =>{
    const employeeId = await employeeModel.findByIdAndDelete(req.params.id);
    if(!employeeId) {
        res.status(404);
        throw new Error("Employee not found");
    }else {
        res.send(employeeId);
    }
    await employeeModel.remove();
    res.status(200).json(employeeId);
});

module.exports = {
    getEmployees,
    createEmployee, 
    Avatar,
    getEmployee,
    updateEmployee, 
    deleteEmployee,
    paginationSearch
};