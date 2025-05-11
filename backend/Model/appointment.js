const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctor: {
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    doctorname: {
      type: String,
      required: true
    }
  },
  patient: [{
    patient: String,
    email: String,
    days: String,
    times: String,
    reason: String
  }]
}, { timestamps: true });

module.exports = mongoose.model("Appointment", appointmentSchema);
