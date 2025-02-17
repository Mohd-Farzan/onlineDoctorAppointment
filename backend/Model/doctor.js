const mongoose = require("mongoose");
const doctorSchema =  mongoose.Schema({
    userName :{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    Address:{
        type:String,
        required:true,
    },
    Speciality :{
        type:String,
        required:true,
    },
    Availability: [{
        type: String,
        enum: ['morning', 'afternoon', 'evening', 'notavailable'],  
        default: 'notavailable'  
    }],
    Time:{
        type:String,
        require:true,
    },
    Fees:{
        type:Number,
        require:true,
    }
    


});
const doctorModel=mongoose.model('doctor',doctorSchema);
module.exports = doctorModel