// onst express = require("express");
// const axios = require("axios");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const path = require("path");

// dotenv.config();
// const app = express();
// app.use(cors());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// const PORT = 3000;

// async function getZoomAccessToken() {
//   const token = Buffer.from(
//     ${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}
//   ).toString("base64");

//   const response = await axios.post(
//     "https://zoom.us/oauth/token",
//     null,
//     {
//       params: {
//         grant_type: "account_credentials",
//         account_id: process.env.ZOOM_ACCOUNT_ID,
//       },
//       headers: {
//         Authorization: Basic ${token},
//       },
//     }
//   );

//   return response.data.access_token;
// }

// app.get("/", (req, res) => {
//   res.render("index", { meeting: null, error: null });
// });

// app.post("/create-meeting", async (req, res) => {
//   const topic = req.body.topic || "Consultation";
//   try {
//     const accessToken = await getZoomAccessToken();

//     const response = await axios.post(
//       "https://api.zoom.us/v2/users/me/meetings",
//       {
//         topic,
//         type: 1,
//         settings: {
//           host_video: true,
//           participant_video: true,
//           waiting_room: true,
//         },
//       },
//       {
//         headers: {
//           Authorization: Bearer ${accessToken},
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     res.render("index", { meeting: response.data, error: null });
//   } catch (err) {
//     console.error(err?.response?.data || err.message);
//     res.render("index", {
//       meeting: null,
//       error: "Failed to create Zoom meeting.",
//     });
//   }
// });

// app.listen(PORT, () => {
//   console.log(Server running at http://localhost:${PORT});
// });