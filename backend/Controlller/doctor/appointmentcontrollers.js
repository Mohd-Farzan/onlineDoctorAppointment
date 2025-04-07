const Appointment = require("../../Model/appointment");
const doctorModel = require("../../Model/doctor");

const createAppointment = async (req, res) => {
  try {
    const {

      patient,
      doctor,
      date,
      time,
      reason,
      }= req.body;
    if (!patient || !doctor) {
      return res.status(400).json({
        success: false,
        message: 'doctor required!!.',

      });
    }



    const newAppointment = new Appointment({
      patient,
      doctor,
      date: new Date(date),
      time,
      reason,
    });
    await newAppointment.save();
    res.status(200).json({
      success: true,
      message: 'Your Appointment is shedule you will recieve an email please check ',
      data: newAppointment
    });
  } catch (err) {
    console.error('Error creating doctor:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to create doctor',
      error: err.message || err,
    });
  }
};

//   const showDoctor = async (req, res) => {
//     try {
//       const doctors = await doctorModel.find({});

//       if (!doctors || doctors.length === 0) {
//         return res.status(404).json({
//           success: false,
//           message: "No doctors found",
//         });
//       }

//       res.status(200).json({
//         success: true,
//         message: "Doctor details fetched successfully",
//         data: doctors,
//       });
//     } catch (err) {
//       res.status(500).json({
//         success: false,
//         message: "Failed to fetch doctors",
//         error: err.message,
//       });
//     }
//   };
const AppointmentDoc = async (req, res) => {

  try {
    const Appointmentdoctor = await Appointment.find();

    console.log("Doc", Appointmentdoctor);


  } catch (e) {
    console.log(e)
  }
}
module.exports = { createAppointment, AppointmentDoc }