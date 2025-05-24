require('dotenv').config();
const bcrypt=require('bcryptjs')
const UserModel = require('../../Model/userModel'); // Updated to use single model
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
const crypto=require('crypto')

// Signup user function
const signupUser = async (req, res) => {
    const { userName, email, password ,role} = req.body;
    try {
        const userExist = await UserModel.findOne({ email });
        if (userExist) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        const saltRounds = 10;
        const hash_password = await bcrypt.hash(password, saltRounds);
        const userRole = role || 'user'

        const newUser = new UserModel({
            userName,
            email,
            password: hash_password,
            role:userRole
        });

        await newUser.save();
        res.status(200).json({
            success: true,
            message: 'User account created successfully',
            // user: { email: newUser.email, id: newUser._id }
            user:newUser
        });
    } catch (error) {
        console.error("Error in signup:", error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

// Login user function
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const checkUser = await UserModel.findOne({ email });
        if (!checkUser) {
            return res.status(400).json({ success: false, message: "User doesn't exist, please register first" });
        }

        const pswrdMatch = await bcrypt.compare(password, checkUser.password);
        if (!pswrdMatch) {
            return res.status(400).json({ success: false, message: "Invalid password, please try again" });
        }

        const token = jwt.sign(
            { id: checkUser._id, role: checkUser.role, email: checkUser.email,doctorId:checkUser.doctorId },
            process.env.CLIENT_SECRET_KEY || 'CLIENT_SECRET_KEY', // Use environment variable for secret
            { expiresIn: '60m' }
        );
        console.log(token,"token")

        // Set the JWT in a cookie
        res.cookie('token', token, { httpOnly: true, secure: false });
           res.json({
                success: true,
                message: 'Login successful',
                user: {
                    email: checkUser.email,
                    role: checkUser.role,
                    id: checkUser._id,
                    token:token,
                    userName: checkUser.userName,
                    doctorId:checkUser.doctorId
                },
            });
           console.log(checkUser)
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

// Auth middleware function
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token; // Access token from cookies

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized user'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.CLIENT_SECRET_KEY || 'CLIENT_SECRET_KEY');
        req.user = decoded;
        res.status(200).json({
            success: true,
            user: decoded
        });
        // next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("Error in authorization:", error.stack);
        res.status(401).json({
            success: false,
            message: 'Unauthorized user!'
        });
    }
};
const logoutUser = (req, res) => {
    try {
        res.clearCookie('token',{httpOnly:true}).json({
            success: true,
            message: 'User logged out successfully'
        });
    } catch (error) {
        console.error("Error in logout:", error);
        res.status(500).json({
            success: false,
            message: 'Failed to log out'
        });
    }
};

// Transporter for Nodemailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true, // or your preferred email service
    auth: {
      user: process.env.EMAIL, // your email
      pass: process.env.PASSWORD // your email password
    }
  });
  const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Email is invalid'
            });
        }
        const otp = crypto.randomInt(100000, 999999).toString(); 

        // Save OTP and expiration time
        user.resetOtp = otp;
        user.otpExpires = Date.now() + 5 * 60 * 1000; // 1 min expiry
        await user.save();

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: user.email,
            subject: "Password Reset OTP",
            text: `Your reset password OTP is ${otp}. It expires in 1 min.`
        });

        res.status(200).json({
            success: true,
            message: 'OTP sent to your email'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error sending OTP'
        });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { id } = req.params; 
        const { email, password, userName } = req.body;

        const findUser = await UserModel.findById(id);
        if (!findUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Update fields only if they are provided in the request
        findUser.email=email || findUser.email
        findUser.userName=userName || findUser.userName
        if (password) {
            const saltRounds = 10;
            findUser.password = await bcrypt.hash(password, saltRounds);
        }

        // Save the updated user
        await findUser.save();

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: findUser
        });
    } catch (error) {
        console.error("Error in updateProfile:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const verifyOtpAndResetPswrd = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        // Find the user
        const user = await UserModel.findOne({ email });
        if (!user || user.resetOtp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        // Hash new password
        const hash_password = await bcrypt.hash(newPassword, 10);
        user.password = hash_password;
        user.resetOtp = undefined;
        user.otpExpires = undefined;

        // Save the user
        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Your password has been reset successfully',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while resetting the password',
            error: error.message,
        });
    }
};

module.exports = { signupUser, loginUser, authMiddleware ,logoutUser ,forgotPassword,verifyOtpAndResetPswrd,updateProfile};
