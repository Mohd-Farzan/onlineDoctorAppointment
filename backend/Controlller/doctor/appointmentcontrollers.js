const Appointment = require("../../Model/appointment");
const doctorModel = require("../../Model/doctor");
const UserModel = require("../../Model/userModel");
const nodemailer = require('nodemailer')

const createAppointment = async (req, res) => {
  try {
    const { patient, email, doctor, days, times, reason } = req.body;

    if (!patient || !email || !doctor) {
      return res.status(400).json({
        success: false,
        message: "Patient, email, and doctor are all required.",
      });
    }

    // 1) look up doctor name
    const doc = await doctorModel.find(doctor.name);
    if (!doc) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    // 2) create & save
    const newAppointment = new Appointment({
      patient,
      email,
      doctor,      // store name if you like
      days,
      times,
      reason,
    });
    await newAppointment.save();

    // 3) send confirmation email
    await transporter.sendMail({
      from:    process.env.EMAIL_USER,
      to:      email,
      subject: "Your Appointment is Confirmed",
      html: `
        <h2>Hi ${patient},</h2>
        <p>Your appointment with <strong>Dr. ${doc.name}</strong> is booked for 
           <strong>${days} @ ${times}</strong>.</p>
        <p>Reason: ${reason}</p>
        <p>Thank you for choosing our service!</p>
      `,
    });

    // 4) respond
    res.status(200).json({
      success: true,
      message:
        "Your appointment is scheduled — please check your email for details.",
      data: newAppointment,
    });
  } catch (err) {
    console.error("Error creating appointment:", err);
    res.status(500).json({
      success: false,
      message: "Failed to create appointment",
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
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true, // or your preferred email service
  auth: {
    user: process.env.EMAIL, // your email
    pass: process.env.PASSWORD // your email password
  }
});
const appointmentConfirmationEmail = async (req, res) => {
  try {
      const { email } = req.body;
      const user = await UserModel.findOne({ email });

      if (!user) {
          return res.status(400).json({
              success: false,
              message: 'Email is invalid'
          });
      }
      await transporter.sendMail({
          from: process.env.EMAIL,
          to: user.email,
          subject: "Appointment Confirmation",
          text:" Conguratulations Your Appointment Is Booked Successfully ! Our team Connect you soon..."
      });

      res.status(200).json({
          success: true,
          message: 'msg send to email'
      });

  } catch (error) {
      console.error(error);
      res.status(500).json({
          success: false,
          message: 'Error sending msg'
      });
  }
};
module.exports = { createAppointment, AppointmentDoc ,appointmentConfirmationEmail}