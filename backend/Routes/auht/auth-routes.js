const express=require('express');
const { signupUser,loginUser,authMiddleware ,logoutUser,forgotPassword, verifyOtpAndResetPswrd ,updateProfile} = require('../../Controlller/auth/auth-controller');
const passport = require("passport");
const router=express.Router();
router.post('/signup',signupUser);
router.post('/login',loginUser);
router.post('/logout',logoutUser)
router.post('/forgot-password',forgotPassword)
router.post('/reset-pswrd',verifyOtpAndResetPswrd)
router.put('/profile/:id',updateProfile)

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google", {
  successRedirect: "http://localhost:3000/dashboard",
  failureRedirect: "http://localhost:3000/login"
}));

router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));

router.get("/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "http://localhost:3000/dashboard",
  failureRedirect: "http://localhost:3000/login"
}));
router.get('/checkroute', authMiddleware , (req, res) => {
    res.json({ success: true, user: { id: req.user._id, userName: req.user.userName} });
  });
module.exports=router