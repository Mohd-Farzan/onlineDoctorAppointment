const express = require("express");
const { createAppointment, appointmentConfirmationEmail, getMyAppointments, acceptAppointment,} = require("../Controlller/doctor/appointmentcontrollers");
const { updateDoctorProfile } = require("../Controlller/doctor/doctorcontrollers");
const { fetchAppointment,cancelAppointment} = require("../Controlller/Appointment.Controller");
const router = express.Router();
router.post("/create-appointment",createAppointment);
router.get("/get-appointment/:userId",getMyAppointments);
router.get('/fetch-appointment/:email',fetchAppointment);
router.post("/appointment-confirmation-email",appointmentConfirmationEmail)
// router.post('appointment-cancelation-mail',AppointmentCancelationMail)
router.put('/update-doctor-profile',updateDoctorProfile)
router.post('/accept/:_id',acceptAppointment)
router.post('/cancle-appointment/:_id/:email',cancelAppointment)
// router.patch('/reject/:appointmentId/:email', rejectAppointment)


// router.get("/show-doctor",showDoctor);

module.exports= router;
