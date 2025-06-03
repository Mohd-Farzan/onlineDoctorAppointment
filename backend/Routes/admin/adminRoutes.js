const express =require('express');
const { createDoctor } = require('../../Controlller/doctor/doctorcontrollers');
const route=express.Router();
route.post('/doctor',createDoctor)
route.post("/create-doctor",createDoctor);
module.exports=route