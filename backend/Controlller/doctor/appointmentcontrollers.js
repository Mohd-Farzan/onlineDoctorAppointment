const Appointment = require("../../Model/appointment");
const doctorModel = require("../../Model/doctor");
const UserModel = require("../../Model/userModel");
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');


// --- Create Appointment ---
const createAppointment = async (req, res) => {
  try {
    const { patient, email, doctorId, days, times, reason } = req.body;

    if (!patient || !email || !doctorId) {
      return res.status(400).json({
        success: false,
        message: "Patient name, email, and doctor are required.",
      });
    }

    // Find doctor details
    const doc = await doctorModel.findById(doctorId);
    if (!doc) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    // Create new appointment with nested doctor and patient objects
    const newAppointment = Appointment.updateOne(
      { "doctor.doctorId": doctorId  },
      { "$push" :{
        patient: { 
          name: patient,
          email,
          days,
          times,
          reason
        }
      } }
    );

    // Send confirmation email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Appointment is Confirmed",
      html: `
        <h2>Hi ${patient},</h2>
        <p>Your appointment with <strong>Dr. ${doc.name}</strong> is booked for 
        <strong>${days} at ${times}</strong>.</p>
        <p>Reason: ${reason}</p>
        <p>Thank you for choosing our service!</p>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Appointment booked successfully. Check your email for details.",
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

// --- Send Confirmation Email Alone ---
const appointmentConfirmationEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Email not registered',
      });
    }

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: user.email,
      subject: "Appointment Confirmation",
      text: "Congratulations! Your appointment is booked successfully. Our team will connect with you soon.",
    });

    res.status(200).json({
      success: true,
      message: 'Confirmation email sent successfully',
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error sending email',
    });
  }
};

// --- Get Appointments for Logged-In Doctor ---
const getMyAppointments = async (req, res) => {
  try {
    const doctorId = req.params.drId;
    if (!doctorId || !mongoose.Types.ObjectId.isValid(doctorId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid doctor ID",
      });
    }

    const appointments = await Appointment.find({
      'doctor.doctorId': doctorId
    }, { patient: 1 })

    res.status(200).json({
      success: true,
      message: "Appointments fetched successfully",
      data: appointments[0].patient
    });

  } catch (err) {
    console.error('Error in getMyAppointments:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch appointments',
      error: err.message,
    });
  }
};

// --- Email Transporter ---
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

module.exports = {
  createAppointment,
  appointmentConfirmationEmail,
  getMyAppointments
};
