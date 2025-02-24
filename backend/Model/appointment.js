const mongoose = require("mongoose");
const appointmentSchema =  mongoose.Schema({

    patient :{
        type:String,

    },
    doctor :{
        // type:mongoose.Schema.TypesObjectId, ref:'doctor'
        type:String
    },
    date:{
        type:Date,
    },
    time : {
        type:String,
    },
status :{
    type:String,
    // enum : ['pending','confirmed','cancelled'],
}

});
const Appointment=mongoose.model('appointment',appointmentSchema);
module.exports = Appointment