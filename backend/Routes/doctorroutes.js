const express = require("express");
const { showDoctor, createDoctor, updateDoctorProfile } = require("../Controlller/doctor/doctorcontrollers");
const router = express.Router();
router.post("/create-doctor",createDoctor);
router.get("/show-doctor",showDoctor);
router.put("/update-doctor",updateDoctorProfile)

module.exports= router;