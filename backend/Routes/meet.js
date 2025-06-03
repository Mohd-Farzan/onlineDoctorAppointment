// routes/videoRoutes.js
const express = require("express");
const { createZoomMeeting, videoCallingRequestForm } = require("../Controlller/videocontroller");

const router = express.Router();


router.post("/create-room", createZoomMeeting);
router.post('/request-form',videoCallingRequestForm)

module.exports = router;
