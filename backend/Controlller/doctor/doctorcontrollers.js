const appointment = require('../../Model/appointment');
const Doctor = require('../../Model/doctor');

const createDoctor = async (req, res) => {
    const { name, speciality, availability, contact, email, address, fees } = req.body;

    // Validation
    if (!name || !email || !speciality || !address || !fees || !contact) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required',
        });
    }

    try {
        // Validate availability structure
        if (!Array.isArray(availability)) {
            return res.status(400).json({
                success: false,
                message: 'Availability must be an array of day/time slots',
            });
        }

        // Process times from string to array
        const processedAvailability = availability.map(slot => ({
            days: slot.days,
            times: slot.times.split(',').map(t => t.trim())
        }));

        // Trim basic inputs
        const trimmedEmail = email.trim();
        const trimmedName = name.trim();
        const trimmedContact = contact.trim();

        // Check if doctor with same email exists
        const existingDoctor = await Doctor.findOne({ email: trimmedEmail });
        if (existingDoctor) {
            return res.status(400).json({
                success: false,
                message: 'Doctor with this email already exists',
            });
        }

        const newDoctor = new Doctor({
            name: trimmedName,
            speciality,
            availability: processedAvailability,
            contact: trimmedContact,
            email: trimmedEmail,
            address: address.trim(),
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
        const doctors = await Doctor.find({});

        if (!doctors.length) {
            return res.status(404).json({
                success: false,
                message: "No doctors found",
            });
        }

        // Format doctors with proper object conversion
        const formattedDoctors = doctors.map(doc => {
            const doctor = doc.toObject();
            return {
                ...doctor,
                availability: doctor.availability.map(slot => ({
                    days: slot.days,
                    times: slot.times
                }))
            };
        });

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
const updateDoctorProfile = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            success: false,
            message: 'Email is required to update profile',
        });
    }

    try {
        const doctor = await Doctor.findOne({ email });

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: 'Doctor not found',
            });
        }

        // Update only the fields provided
        const fieldsToUpdate = ['name', 'speciality', 'contact', 'address', 'fees','availability'];
        fieldsToUpdate.forEach(field => {
            if (req.body[field]) {
                doctor[field] = req.body[field];
            }
        });

        if (Array.isArray(req.body.availability)) {
            doctor.availability = req.body.availability.map(slot => ({
                days: slot.days,
                times: typeof slot.times === 'string' ? slot.times.split(',').map(t => t.trim()) : slot.times
            }));
        }
        

        await doctor.save();

        res.status(200).json({
            success: true,
            message: 'Doctor profile updated successfully',
            data: doctor,
        });

    } catch (err) {
        console.error('Error updating doctor profile:', err);
        res.status(500).json({
            success: false,
            message: 'Failed to update doctor profile',
            error: err.message,
        });
    }
};
const showAppointmentInDoctorPanel = async(req,res)=>{
    const {email} = req.body;
    console.log(req.body)
    try {
        const patient = await appointment.find(email);
        console.log(patient,"patient")
        if(!patient){
            return res.status(404).json({
                success:false,
                message:"patient not found"
            })
        }
        const availablePatient = patient.map(p => {
            return {
                ...patient,
                
            };
        });

        res.status(200).json({
            success: true,
            message: "Doctors fetched successfully",
            data: formattedDoctors,
        });

    } catch (error) {
        
    }
}
module.exports = { createDoctor, showDoctor,updateDoctorProfile,showAppointmentInDoctorPanel };
