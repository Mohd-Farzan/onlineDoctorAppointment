const express = require("express");
const { showDoctor, createDoctor, updateDoctorProfile, showAppointmentInDoctorPanel } = require("../Controlller/doctor/doctorcontrollers");
const router = express.Router();
router.post("/create-doctor",createDoctor);
router.get("/show-doctor",showDoctor);
router.put("/update-doctor",updateDoctorProfile)
// router.get('/show-appointment',showAppointmentInDoctorPanel)



module.exports= router;