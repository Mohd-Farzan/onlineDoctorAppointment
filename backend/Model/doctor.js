const mongoose = require("mongoose");
const doctorSchema = new mongoose.Schema({
    name :{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    speciality :{
        type:String,
        required:true,
    },
    availablity: [{
        type: String,
        default: 'notavailable'  
    }],
    time:{
        type:String,
        require:true,
    },
    fees:{
        type:Number,
        require:true,
    }
    


});
const doctorModel=mongoose.model('doctorModel',doctorSchema);
module.exports = doctorModel