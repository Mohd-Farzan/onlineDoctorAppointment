const express = require("express");
const { createAppointment,AppointmentDoc, appointmentConfirmationEmail, getMyAppointments} = require("../Controlller/doctor/appointmentcontrollers");
const { updateDoctorProfile } = require("../Controlller/doctor/doctorcontrollers");
const { cancleAppointment, fetchAppointment } = require("../Controlller/Appointment.Controller");
const router = express.Router();
router.post("/create-appointment",createAppointment);
router.get("/get-appointment/:userId",getMyAppointments);
router.get('/fetch-appointment/:email',fetchAppointment);
router.post("/appointment-confirmation-email",appointmentConfirmationEmail)
router.put('/update-doctor-profile',updateDoctorProfile)
router.delete('/cancle-appointment/:id',cancleAppointment)


// router.get("/show-doctor",showDoctor);

module.exports= router;
