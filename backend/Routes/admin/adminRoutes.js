const express =require('express');
const { createDoctor } = require('../../Controlller/doctor/doctorcontrollers');
const route=express.Router();
route.get('/dashboard');
route.post('doctor',createDoctor)
route.get('/doctor-data',)
module.exports=route