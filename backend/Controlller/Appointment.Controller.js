const Appointment = require("../Model/appointment");
const mongoose = require('mongoose');

const fetchAppointment = async (req, res) => {
  try {
    const { email } = req.params;
    const now = new Date();

    await Appointment.updateMany(
      { appointmentDateTime: { $lt: now }, status: "Upcoming" },
      { $set: { status: "Completed" } }
    );

    const appointments = await Appointment.find({ "patient.email": email }).lean();

    const formatted = appointments.map((a) => {
      const matchedPatients = Array.isArray(a.patient)
        ? a.patient.filter((pat) => pat.email === email)
        : [];

      return matchedPatients.map((pat) => ({
        _id: a._id,
        doctor: {
          doctorId: a.doctor?.doctorId || null,
          doctorname: a.doctor?.doctorname || '',
        },
        patient: {
          patient: pat.patient,
          email: pat.email,
          days: pat.days,
          times: pat.times,
          reason: pat.reason,
          status: pat.status,
        },
      }));
    }).flat();

    // console.log("Filtered Appointments:\n", JSON.stringify(formatted, null, 2));

    return res.status(200).json({
      success: true,
      message: 'Appointments fetched successfully',
      data: formatted,
    });
  } catch (err) {
    console.error('Error in getMyAppointments:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch appointments',
      error: err.message,
    });
  }
};
const sendAppointmentCancelationMsg = async ({ to, patientName, doctorName, day, time, reason }) => {
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
            subject: "Your Appointment Has Been Canceled By Doctor",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #2563eb;">Appointment Cancel</h2>
                    <p>Hello ${patientName},</p>
                    <p>Your appointment with <strong>Dr. ${doctorName}</strong> has been canceled.</p>
                    
                    <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; margin: 16px 0;">
                        <p><strong>Date:</strong> ${day}</p>
                        <p><strong>Time:</strong> ${time}</p>
                        ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ''}
                    </div>
                    
                    <p>for any query contact to providers.</p>
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
// const acceptAppointment = async (req, res) => {
//   try {
//     const { _id } = req.params;
//     const { email } = req.body;

//     if (!mongoose.Types.ObjectId.isValid(_id)) {
//       return res.status(400).json({ success: false, message: "Invalid appointment ID" });
//     }
//     console.log(_id, "ID");

//     const appointment = await Appointment.findById(_id);

//     if (!appointment) {
//       return res.status(404).json({ success: false, message: "Appointment ID not found" });
//     }

//     // Find patient inside patient array
//     const matchedPatient = appointment.patient.find(p => p.email === email);

//     if (!matchedPatient) {
//       return res.status(404).json({ success: false, message: "Patient not found in appointment" });
//     }

//     // Update status to 'accepted'
//     matchedPatient.status = "rejected";

//     // Save the appointment document with updated status
//     await appointment.save();

//     // Extract data for email
//     // const patientName = matchedPatient.patient;
//     // const doctorName = appointment.doctor?.doctorname;
//     // const day = matchedPatient.days;
//     // const time = matchedPatient.times;
//     // const reason = matchedPatient.reason || '';

//     // Send email
//     // await sendAppointmentConfirmation({
//     //   to: email,
//     //   patientName,
//     //   doctorName,
//     //   day,
//     //   time,
//     //   reason
//     // });

//     return res.status(200).json({
//       success: true,
//       message: "Appointment accepted and confirmation email sent successfully",
//     });

//   } catch (error) {
//     console.error("Error accepting appointment:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server error while accepting appointment",
//       error: error.message,
//     });
//   }
// };

const cancelAppointment = async (req, res) => {
  try {
    const { _id,email } = req.params;
    

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ success: false, message: "Invalid appointment ID" });
    }
    console.log(_id, "ID");
    console.log(email,"EMAIL")

    const appointment = await Appointment.findById(_id);

    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment ID not found" });
    }

    // Find patient inside patient array
    const matchedPatient = appointment.patient.find(p => p.email === email);

    if (!matchedPatient) {
      return res.status(404).json({ success: false, message: "Patient not found in appointment" });
    }
    console.log(matchedPatient,"E")
    // Update status to 'accepted'
    matchedPatient.status = "cancelled";

    // Save the appointment document with updated status
    await appointment.save();
console.log(matchedPatient,"After")
    // Extract data for email
    const patientName = matchedPatient.patient;
    const doctorName = appointment.doctor?.doctorname;
    const day = matchedPatient.days;
    const time = matchedPatient.times;
    const reason = matchedPatient.reason || '';

    await sendAppointmentConfirmation({
      to: email,
      patientName,
      doctorName,
      day,
      time,
      reason
    });

    return res.status(200).json({
      success: true,
      message: "Appointment Cancelled and confirmation email sent successfully",
    });

  } catch (error) {
    console.error("Error accepting appointment:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while accepting appointment",
      error: error.message,
    });
  }
};

module.exports = { fetchAppointment, cancelAppointment,AppointmentCancelationMail:sendAppointmentCancelationMsg };
