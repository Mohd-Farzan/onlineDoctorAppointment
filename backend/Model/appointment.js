const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patient: String,
  email:   String,    // ← store the user’s email
  doctor:  String,
  date:    Date,
  time:    String,
  reason:  String,
});

module.exports = mongoose.model("Appointment", appointmentSchema);
