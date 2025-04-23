const Doctor = require('../../Model/doctor');

const createDoctor = async (req, res) => {
    const { name, speciality, availability, contact, email, address, fees } = req.body;
    
    // Validation
    if ( !speciality || !address || !fees || !contact) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required',
        });
    }

    try {
        // Validate availability structure
        if(!Array.isArray(availability)){
          return res.status(400).json({
              success: false,
              message: 'Availability must be an array of date/time slots',
          });
        }

        // Process times from string to array
        const processedAvailability = availability.map(slot => ({
            date: slot.date,
            times: slot.times.split(',').map(t => t.trim())
        }));

        const existingDoctor = await Doctor.findOne({ email });
        if (existingDoctor) {
            return res.status(400).json({
                success: false,
                message: 'Doctor with this email already exists',
            });
        }

        const newDoctor = new Doctor({
            name,
            speciality,
            availability: processedAvailability,
            contact,
            email,
            address,
            fees,
        });

        await newDoctor.save();
        
        res.status(201).json({
            success: true,
            message: 'Registration completed successfully',
            data: newDoctor
        });
        
    } catch (err) {
        console.error('Error creating doctor:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to create doctor',
            error: err.message,
        });
    }
};

const showDoctor = async (req, res) => {
    try {
        const doctors = await Doctor.find({})
           

        if (!doctors.length) {
            return res.status(404).json({
                success: false,
                message: "No doctors found",
            });
        }

        // Format dates
        const formattedDoctors = doctors.map(doctor => ({
            ...doctor,
            availability: doctor.availability.map(slot => ({
                date: new Date(slot.date).toISOString().split('T')[0],
                times: slot.times
            }))
        }));

        res.status(200).json({
            success: true,
            message: "Doctors fetched successfully",
            data: formattedDoctors,
        });
        
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch doctors",
            error: err.message,
        });
    }
};

module.exports = { createDoctor, showDoctor };