const express = require("express");
const { createAppointment, appointmentConfirmationEmail, getMyAppointments} = require("../Controlller/doctor/appointmentcontrollers");
const { updateDoctorProfile } = require("../Controlller/doctor/doctorcontrollers");
const router = express.Router();
router.post("/create-appointment",createAppointment);
router.get("/get-appointment/:drId",getMyAppointments);
router.post("/appointment-confirmation-email",appointmentConfirmationEmail)
router.put('/update-doctor-profile',updateDoctorProfile)


// router.get("/show-doctor",showDoctor);

module.exports= router;
