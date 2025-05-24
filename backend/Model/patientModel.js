const mongoose = require('mongoose');
const patientSchema =  mongoose.Schema({

    Name :{
        type:String,
        required:true,
    },
    Email :{
        type:String,
        required:true,
    },
    Phone:
    {
     type:String,
    },
    Date:{
        type:Date,
    },
    Message:{
        type:String,
    },
    Appointment:[{
        type:mongoose.Schema.Types.ObjectId,ref : 'Appointment'
      
    }],


});
module.exports = mongoose.model('patient',patientSchema);