// controllers/videoController.js
const axios = require("axios");
const requestData=require('../Model/videoCallingRequestModel');
const Doctor = require("../Model/doctor");

const getZoomAccessToken = async () => {
  const ZOOM_CLIENT_ID="49i6kMp5Q6OXRGxiRU4O2Q";
  const ZOOM_CLIENT_SECRET="780ctWdE2kniNv4JQS25juWYCY26D4F7"
  const ZOOM_ACCOUNT_ID="bDUt4--4To6mjXEokn1EEw"
  const token = Buffer.from(
    `${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`
  ).toString("base64");
  const response = await axios.post(
    "https://zoom.us/oauth/token",
    null,
    {
      params: {
        grant_type: "account_credentials",
        account_id: ZOOM_ACCOUNT_ID,
      },
      headers: {
        Authorization: `Basic ${token}`,
      },
    }
  );
  

  return response.data.access_token;
};

const createZoomMeeting = async (req, res) => {
  const { topic = "Consultation" } = req.body;
  try {
    const accessToken = await getZoomAccessToken();

    const response = await axios.post(
      "https://api.zoom.us/v2/users/me/meetings",
      {
        topic,
        type: 1, // Instant meeting
        settings: {
          host_video: true,
          participant_video: true,
          waiting_room: true,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }

    );

    res.status(200).json(data=response.data);
  } catch (err) {
    console.error(err?.response?.data || err.message);
    res.status(500).json({ message: "Failed to create Zoom meeting." });
  }
};
const videoCallingRequestForm=async(req,res)=>{
  try {
      const { problem,phone,speciality, email} = req.body;
      if(!problem || !phone || !speciality){
          return res.status(400).json({
            success:false,
            message:"all field required"
          })
      }
      const newRequest = new requestData({
        problem,
        phone,
        speciality,
        email
      });
      
      await Doctor.updateMany({speciality:speciality},{ "$push": { requests: newRequest } })

      res.status(200).json({
        success: true, // Correct the success field to true
        message: "your form is submitted our team contact you...",
        data: newRequest
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error:error.message
      });
    }
}
module.exports = {createZoomMeeting,videoCallingRequestForm}