const express = require('express');
const DocRequestRouter = express.Router();
const Doctor = require('../Model/doctor');

DocRequestRouter.get('/getVideoRequests/:speciality', async (req, res) => {
  try {
    const speciality = req.params.speciality;

    const doctor = await Doctor.findOne({ speciality: speciality });

    if (!doctor) {
      return res.status(404).json({ success: false, message: "Doctor with this speciality not found" });
    }

    res.json({ success: true, requests: doctor.requests });
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


module.exports = DocRequestRouter;
