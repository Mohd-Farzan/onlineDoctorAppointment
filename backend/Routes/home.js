const express = require("express");
const router = express.Router();
const Doctor = require('../models/doctor');
const patientModel = require("../models/patientModel");


router.get("/",async (req,res)=>{
    let doctor = await  Doctor.find();
    let patient =await patientModel.find();


    res.render("home",{doctor,patient})
})


  

module.exports= router;
