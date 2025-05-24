const express = require('express')
const { updateProfile } = require('../Controlller/auth/userController')
const router=express.Router()
router.post('/profile/:id',updateProfile)
module.exports=router