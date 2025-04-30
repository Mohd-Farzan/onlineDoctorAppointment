const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctor: {
    doctorId: {
      type: String,
      required: true
    },
    doctorname: {
      type: String,
      required: true
    }
  },
  patient: [{
    name: String,
    email: String,
    days: String,
    times: String,
    reason: String
  }]
}, { timestamps: true });

module.exports = mongoose.model("Appointment", appointmentSchema);
