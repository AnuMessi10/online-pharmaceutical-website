const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema({
    firstname :{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },
    mobileNo:{
        type:Number,
        required:true,
        unique:true
    },
    
    message:{
        type:String,
        required:true
    },
    
})

const Contact = new mongoose.model("Contact", employeeSchema);

module.exports = Contact;