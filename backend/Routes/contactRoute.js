const express = require("express");
const { contact } = require("../Controlller/ContactController");
const router = express.Router();
router.post("/create-contact",contact);

module.exports= router;