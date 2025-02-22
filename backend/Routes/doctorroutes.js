const express = require("express");
const { showDoctor, createDoctor } = require("../Controlller/doctor/doctorcontrollers");
const router = express.Router();
router.post("/create-doctor",createDoctor);
router.get("/show-doctor",showDoctor);

module.exports= router;