const express = require("express");
const { showDoctor, createDoctor } = require("../Controlller/doctor/doctorcontrollers");
const router = express.Router();


router.get("/",(req,res)=>{
  res.render("createdoc")
});

router.post("/data",createDoctor);
router.get("/show-doctor",showDoctor);

module.exports= router;