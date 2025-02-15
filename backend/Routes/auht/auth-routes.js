const express=require('express');
const { signupUser,loginUser,authMiddleware ,logoutUser,forgotPassword, verifyOtpAndResetPswrd ,updateProfile} = require('../../Controlller/auth/auth-controller');
const router=express.Router();
router.post('/signup',signupUser);
router.post('/login',loginUser);
router.post('/logout',logoutUser)
router.post('/forgot-password',forgotPassword)
router.post('/reset-pswrd',verifyOtpAndResetPswrd)
router.put('/profile/:id',updateProfile)
router.get('/checkroute', authMiddleware , (req, res) => {
    res.json({ success: true, user: { id: req.user._id, userName: req.user.userName} });
  });
module.exports=router