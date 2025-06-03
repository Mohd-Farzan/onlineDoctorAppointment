const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
    days: {
        type: String,
        required: true
    },
    times: [{
        type: String,
        required: true
    }]
});

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true,
    },
    speciality: {
        type: String,
        required: true,
    },
    availability: [availabilitySchema],  // Corrected field name and structure
    contact: {
        type: String,  // Changed to String
        required: true
    },
    fees: {
        type: Number,
        required: true,
    },
    requests: {
        type:Array
    }
});

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;