const mongoose = require("mongoose");
const bycrypt = require("bcryptjs")
const employeeSchema = new mongoose.Schema({
    firstname :{
        type:String,
        required:true
    },
    lastname:{
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
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    },
})

employeeSchema.pre("save",async function(next){
        this.password = await bycrypt.hash(this.password,10);  // converts the password entered by the user to a hash value
        this.cpassword = undefined; //doesnt store value of confirm password in databse
        next();
    
    // console.log(`password is ${this.password}`)

})

const Register = new mongoose.model("Registration", employeeSchema);

module.exports = Register;