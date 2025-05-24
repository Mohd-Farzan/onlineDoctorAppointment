// routes/videoRoutes.js
const express = require("express");
const { createZoomMeeting } = require("../Controlller/videocontroller");

const router = express.Router();


router.post("/create-room", createZoomMeeting);

module.exports = router;
