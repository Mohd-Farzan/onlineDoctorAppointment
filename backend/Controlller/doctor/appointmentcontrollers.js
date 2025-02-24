const Appointment = require("../../Model/appointment");

const createAppointment = async (req, res) => {
    try {
    const { patient,doctor,date,time,status} = req.body;
    if (!patient || !doctor || !date|| !time || !status) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
        
      });
    }
  
    
      
      const newAppointment = new Appointment({
        patient,
        doctor,
        date,
        time,
        status,
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
module.exports={createAppointment}