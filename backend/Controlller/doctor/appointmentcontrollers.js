const Appointment = require("../../Model/appointment");
const doctorModel = require("../../Model/doctor");
const UserModel = require("../../Model/userModel");
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

const createAppointment = async (req, res) => {
    try {
        const { patient, email, doctorId, days, times, reason ,status} = req.body;

        // 1) Enhanced validation
        if (!patient || !email || !doctorId || !days || !times) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
                requiredFields: ['patient', 'email', 'doctorId', 'days', 'times']
            });
        }

        // Validate email format
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }

        // 2) Verify doctor exists
        const doc = await doctorModel.findById(doctorId).lean();
        if (!doc) {
            return res.status(404).json({ 
                success: false, 
                message: 'Doctor not found',
                suggestion: 'Please check the doctor ID'
            });
        }

        // 3) Prepare appointment entry with timestamps
        const entry = {
            patient: patient.trim(),
            email: email.trim().toLowerCase(),
            days: days.trim(),
            times: times.trim(),
            reason: reason?.trim(),
            createdAt: new Date()
        };

        // 4) Find or create appointment
        let appt = await Appointment.findOne({ 'doctor.doctorId': doctorId });
        
        if (appt) {
            // Check for duplicate appointment
            // const existingAppointment = appt.patient.find(
            //     apt => apt.email === entry.email && 
            //            apt.days === entry.days && 
            //            apt.times === entry.times
            // );
            
            // if (existingAppointment) {
            //     return res.status(409).json({
            //         success: false,
            //         message: 'Appointment already exists for this time slot'
            //     });
            // }

            appt.patient.push(entry);
            await appt.save();
        } else {
            appt = await Appointment.create({
                doctor: {
                    doctorId: doc._id.toString(),
                    doctorname: doc.name,
                    specialty: doc.speciality
                },
                patient: [entry],
                status: "Upcoming", // ✅ correct placement
        appointmentDateTime: new Date() 
            });
        }

        // 5) Send confirmation email (uncomment when ready)
        
        await sendAppointmentConfirmation({
            to: email,
            patientName: patient,
            doctorName: doc.name,
            day: days,
            time: times,
            reason
        });
        

        // 6) Return response with appointment details
        return res.status(201).json({
            success: true,
            message: 'Appointment booked successfully',
            data: {
                appointmentId: appt._id,
                doctor: appt.doctor,
                patient: entry,
                bookedAt: entry.createdAt
            }
        });

    } catch (err) {
        console.error('Error creating appointment:', err);
        return res.status(500).json({
            success: false,
            message: 'Failed to create appointment',
            error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
};

// --- Get Appointments for Logged-In Doctor ---
const getMyAppointments = async (req, res) => {
  try {
    const { userId } = req.params; // ✅ Extract doctor ID
    console.log(userId, "USERID");

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid doctor ID format" });
    }

    
    const appointments = await Appointment.find({
      'doctor.doctorId': userId.toString(),
    });
    
    const formatted = appointments.map((a) => {
      return a.patient.map((pat) => ({
        doctor: {
          doctorId: a.doctor?.doctorId || null,
          doctorname: a.doctor?.doctorname || '',
        },
        patient: {
          patient: pat.patient || '',
          email: pat.email || '',
          days: pat.days || '',
          times: pat.times || '',
          reason: pat.reason || '',
        },
      }));
    }).flat();
    console.log(formatted,"APPPPP")

    return res.status(200).json({
      success: true,
      message: 'Appointments fetched successfully',
      data: formatted,
    });
  }
   catch (err) {
    console.error('Error in getMyAppointments:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch appointments',
      error: err.message,
    });
  }
};


// --- Email Utility Function ---
const sendAppointmentConfirmation = async ({ to, patientName, doctorName, day, time, reason }) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        await transporter.sendMail({
            from: `"PulseCare" <${process.env.EMAIL}>`,
            to,
            subject: "Your Appointment Confirmation",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #2563eb;">Appointment Confirmed</h2>
                    <p>Hello ${patientName},</p>
                    <p>Your appointment with <strong>Dr. ${doctorName}</strong> has been confirmed.</p>
                    
                    <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; margin: 16px 0;">
                        <p><strong>Date:</strong> ${day}</p>
                        <p><strong>Time:</strong> ${time}</p>
                        ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ''}
                    </div>
                    
                    <p>Please arrive 10 minutes before your scheduled time.</p>
                    <p>Thank you for choosing our clinic!</p>
                </div>
            `
        });

        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};

module.exports = {
    createAppointment,
    appointmentConfirmationEmail: sendAppointmentConfirmation,
    getMyAppointments
};