const patientModel = require('../models/patientModel'); 
// const alert = require('alert-node');

module.exports.createPatient = async (req, res) => {
    try {
        let { Name, Email, Phone,Date,Message } = req.body;

        let patient = await patientModel.create({
            Name,
            Email,
            Phone,
            Date,
            Message
        });
   

// alert("appointment Success")
       
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: 'Failed to create patient',
            details: err.message || err
        });
    }
};

module.exports.showPatient = async (req, res) => {
    try {

        let patient = await patientModel.find();
         res.render("showpatient",{patient});


       
    } catch (err) {
        console.error(err);
     
    }
};