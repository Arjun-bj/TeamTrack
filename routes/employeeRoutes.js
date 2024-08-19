const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");
const upload = require("../config/multer");
const {
    getEmployees,
    createEmployee,
    Avatar,
    getEmployee,
    updateEmployee,
    deleteEmployee,
    paginationSearch
} = require("../controllers/employeeController");

router.route("/getDatas").get(paginationSearch);
router.route("/").get(getEmployees);
router.route("/:id/avatar").post(upload, Avatar);
router.route("/create").post(createEmployee);
router.route("/:id").get(getEmployee);
router.route("/:id").put(updateEmployee);
router.route("/:id").delete(deleteEmployee);

module.exports = router;

