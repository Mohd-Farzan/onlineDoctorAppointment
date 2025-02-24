const express = require("express");
const { createAppointment } = require("../Controlller/doctor/appointmentcontrollers");
const router = express.Router();
router.post("/create-appointment",createAppointment);
// router.get("/show-doctor",showDoctor);

module.exports= router;