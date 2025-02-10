const mongoose = require("mongoose");
const doctorSchema =  mongoose.Schema({

    Name :{
        type:String,
        required:true,
    },
    Email:{
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
module.exports = mongoose.model('doctor',doctorSchema);