const Appointment = require("../Model/appointment");
const mongoose = require('mongoose');
const fetchAppointment = async (req, res) => {
  try {
    const { email} = req.params; // ✅ Extract doctor ID
    // console.log(email, "USERID");
const now = new Date();
await Appointment.updateMany(
  { appointmentDateTime: { $lt: now }, status: "Upcoming" },
  { $set: { status: "Completed" } }
);
    const appointments = await Appointment.find({
      "patient.email": email,
    }).lean();
    // if(appointments.email==email){
      const formatted = appointments.map((a) => {
      const matchedPatients = a.patient.filter((pat) => pat.email === email);
      return matchedPatients.map((pat) => ({
        _id:a._id,
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
          status:pat.status
        },
      }));
    }).flat();
    console.log("Filtered Appointments:\n", JSON.stringify(formatted, null, 2)); // 👈 Proper readable output

    return res.status(200).json({
      success: true,
      message: 'Appointments fetched successfully',
      data: formatted,
    });
  }
// }
   catch (err) {
    console.error('Error in getMyAppointments:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch appointments',
      error: err.message,
    });
  }
}
const cancleAppointment = async (req, res) => {
  try {
    const id = req.params.id;
    const cancleAptmnt = await Appointment.findByIdAndDelete(id);

    console.log(id, "id from appointment");
    console.log(cancleAptmnt, "deleted appointment");

    if (!cancleAptmnt) {
      return res.status(404).json({
        success: false,
        message: "Appointment ID not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting appointment",
    });
  }
};

module.exports={fetchAppointment,cancleAppointment}