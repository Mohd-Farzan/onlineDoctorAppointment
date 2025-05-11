const Appointment = require("../Model/appointment");
const mongoose = require('mongoose');
const fetchAppointment = async (req, res) => {
  try {
    const { userId } = req.params; // ✅ Extract doctor ID
    console.log(userId, "USERID");

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid doctor ID format" });
    }

    const appointments = await Appointment.find({
      'patient._id': userId.toString(),
    });
    console.log(appointments,"userid")
    const formatted = appointments.map((a) => {
      return a.patient.map((pat) => ({
        // doctor: {
        //   doctorId: a.doctor?.doctorId || null,
        //   doctorname: a.doctor?.doctorname || '',
        // },
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
}
module.exports=fetchAppointment