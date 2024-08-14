const express = require("express");
const multer = require("multer");
const path = require("path");
const { 
        addEmployee,
        deleteEmployeeById,
        getEmployeeById,
        updateEmployeeById,
        getAllEmployee
    } = require("../controllers/admin-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");


const router = express.Router();

const storage = multer.diskStorage({
    destination:(req, res, cb)=>{
        cb(null, "public/uploads")
    },
    filename:(req, file, cb) => {
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({
    storage:storage,
})





// SubCategory API
router.route("/save-employee").post(authMiddleware,adminMiddleware, upload.single('image'), addEmployee);
router.route("/employees").get(authMiddleware,adminMiddleware,  getAllEmployee );
router.route("/employee/delete/:id").delete(authMiddleware, adminMiddleware, deleteEmployeeById);
router.route("/employee/:id").get(authMiddleware, adminMiddleware, getEmployeeById );
router.route("/employee/update/:id").patch(authMiddleware, adminMiddleware, upload.single('image'), updateEmployeeById );





module.exports = router;