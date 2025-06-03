const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctor: {
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    doctorname: { type: String, required: true }
  },
  patient: [{
    patient: { type: String, required: true },
    email: { type: String, required: true },
    days: { type: String, required: true },
    times: { type: String, required: true },
    reason: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "cancelled","accepted","Completed"],
      default: "pending"
    },
    appointmentDateTime: {
      type: Date,
    },
    videoRoomLink: {
      type: String,
      default: '',
    }
  }],
}, { timestamps: true });

module.exports = mongoose.model("Appointment", appointmentSchema);
