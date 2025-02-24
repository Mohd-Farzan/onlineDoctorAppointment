const doctorModel=require('../../Model/doctor');
const UserModel = require('../../Model/userModel');
const createDoctor = async (req, res) => {
    const { name, speciality, availablity, email, address, time, fees  } = req.body;
    if (!name || !speciality || !email || !address || !time || !fees ) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: name, speciality, email, address, time, fees,',
      });
    }
  
    try {

      const existingDoctor = await doctorModel.findOne({ email });
      if (existingDoctor) {
        return res.status(400).json({
          success: false,
          message: 'Doctor with this email already exists',
        });
      }
      const newDoctor = new doctorModel({
        name,
        speciality,
        availablity,
        email,
        address,
        time,
        fees,
      });
      await newDoctor.save();
      res.status(200).json({
        success: true,
        message: 'Your registration is completed',
        data: newDoctor
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

  const showDoctor = async (req, res) => {
    try {
      const doctors = await doctorModel.find({});
  
      if (!doctors || doctors.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No doctors found",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Doctor details fetched successfully",
        data: doctors,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch doctors",
        error: err.message,
      });
    }
  };
module.exports={createDoctor,showDoctor}