const mongoose = require("mongoose");
const appointmentSchema = new mongoose.Schema({

    patient:String,
    doctor :String,
    specialty: String,
    availableDays: [String], // ['Monday', 'Wednesday']
    workingHours: {
      start: String, // '09:00'
      end: String    // '17:00'
    },
    appointmentDuration: Number // in minutes (e.g., 30)

});
const Appointment=mongoose.model('appointment',appointmentSchema);
module.exports = Appointment