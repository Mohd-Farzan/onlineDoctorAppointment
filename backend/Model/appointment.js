const mongoose = require("mongoose");
const appointmentSchema = new mongoose.Schema({


    patient : String,
    doctor : String,
    date : Date,
    time : String,
    reason : String,

});
const Appointment=mongoose.model('appointment',appointmentSchema);
module.exports = Appointment