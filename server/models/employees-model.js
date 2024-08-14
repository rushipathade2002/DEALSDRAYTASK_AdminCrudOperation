const {Schema, model } = require ('mongoose');

const EmployeeSchema = new Schema({
    empName:{
        type:String, 
        required:true
    },
    email:{
        type:String, 
        required:true
    },
    mobileNo:{
        type:String, 
        required:true
    },
    designation:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    status:{
        type:String, 
        required:true
    },
    image:{
        type:String, 
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
},
{
    timestamps:true,
});

// create a model or a Collection
const Employee = new model('Employee', EmployeeSchema);

module.exports= Employee;