const Employee = require("../models/employees-model");



// Get All Employee  
const getAllEmployee = async(req, res, next)=>{
    try {
        const Employees = await Employee.find({});
        if(!Employees || Employees.length === 0 ){
            res.status(404).send({message:"Employee not Found"});
        }
        res.status(200).json(Employees)
    } catch (error) {
        next(error)
        console.log(error);
    }
}

// Get Employee By Id API
const getEmployeeById = async (req, res) => {
    try {
      const id = req.params.id;
      const data = await Employee.findById(id);
      if (!data) {
        return res.status(404).send({ message: "Employee not Found" });
      }
      return res.status(200).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  };

// update Employee API
  const updateEmployeeById = async (req, res) => {
    try {
      const id = req.params.id;
      const empData = req.body;
      if (req.file) {
        empData.image = `uploads/${req.file.filename}`;
      }
      const updatedEmployee = await Employee.findByIdAndUpdate(id, empData, { new: true });
      return res.status(200).json({ message: 'Employee updated successfully', updatedEmployee });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  
//   Add Employees API 
const addEmployee = async(req, res)=>{
    try {
        const { empName, email, mobileNo, designation, gender, course, status } = req.body;
        let image = '';
        if (req.file) {
        image = `uploads/${req.file.filename}`;
        }
        const newEmployee = {
            empName, email, mobileNo, designation, gender, course, status, image
        }; 
        const addedEmployee = await Employee.create(newEmployee);
        if (addedEmployee) {
        res.status(201).json({ message: "Employee added successfully", subCategory: addedEmployee });
        } else {
        res.status(400).json({ message: "Failed to add Employee" });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error adding Employee' });
      }
}

// Delete Employee API
const deleteEmployeeById = async(req, res)=>{
    try {
        const id = req.params.id;
        await Employee.deleteOne({_id:id})
        res.status(200).json({message: "Employee Deleted Successfully"});
    } catch (error) {
        // next(error);
        console.error(error)
    }
}


module.exports = {
    getAllEmployee,
    getEmployeeById,
    addEmployee,
    deleteEmployeeById,
    updateEmployeeById 
};