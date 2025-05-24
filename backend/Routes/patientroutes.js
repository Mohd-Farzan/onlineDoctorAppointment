const express = require("express");
const router = express.Router();
const {createPatient,showPatient} = require("../controller/patientcontrollers");


router.get("/",(req,res)=>{
    res.render("createpat")
});
router.post("/data",createPatient);
router.get("/showpatient",showPatient);


module.exports= router;