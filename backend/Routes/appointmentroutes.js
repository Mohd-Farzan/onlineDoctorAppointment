const express = require("express");
const { createAppointment,AppointmentDoc } = require("../Controlller/doctor/appointmentcontrollers");
const router = express.Router();
router.post("/create-appointment",createAppointment);
router.post("/appointment",AppointmentDoc);

// router.get("/show-doctor",showDoctor);

module.exports= router;
