// /models/userModel.js
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user'
    },
    resetOtp:{
    type:String
    },
    otpExpires:{
        type:Date
    },
    doctorProfile:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'doctorModel'
    }
}, { timestamps: true });

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
