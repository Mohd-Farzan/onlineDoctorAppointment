const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patient: String,
  email:   String,    // ← store the user’s email
  doctor:  String,
  days:    String,
  times:    String,
  reason:  String,
});

module.exports = mongoose.model("Appointment", appointmentSchema);
