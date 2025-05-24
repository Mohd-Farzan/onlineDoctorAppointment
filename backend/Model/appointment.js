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
    reason: String,
  }],
   status: {
    type: String,
    enum: ["Upcoming", "Completed"],
    default: "Upcoming"
  },
  appointmentDateTime: {
  type: Date,
  required: true,
},
// models/Appointment.js
videoRoomLink: {
  type: String,
  default: '',
},


}, { timestamps: true }); 

module.exports = mongoose.model("Appointment", appointmentSchema);
