const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const User = require('../models/User'); // Assuming you have a User model

const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

const scopes = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/meetings.space.created',
    'https://www.googleapis.com/auth/meetings.space.readonly',
    // 'https://www.googleapis.com/auth/calendar.events' // If you want to integrate with Calendar
];

// Redirect to Google for authentication
router.get('/google', (req, res) => {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline', // Request a refresh token
        scope: scopes,
        prompt: 'consent' // Forces consent screen even if already authorized
    });
    res.redirect(authUrl);
});

// Google OAuth callback
router.get('/google/callback', async (req, res) => {
    const { code } = req.query;
    try {
        const { tokens } = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(tokens);

        // Get user profile information
        const oauth2 = google.oauth2({
            auth: oAuth2Client,
            version: 'v2'
        });
        const { data } = await oauth2.userinfo.get();
        const { id, email, name, picture } = data;

        // Find or create user in your database
        let user = await User.findOne({ googleId: id });
        if (!user) {
            user = await User.create({
                googleId: id,
                email,
                name,
                picture,
                refreshToken: tokens.refresh_token // Store refresh token securely
            });
        } else {
            // Update refresh token if it changes (rare but good practice)
            user.refreshToken = tokens.refresh_token;
            await user.save();
        }

        // Generate JWT for your application's session
        const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Redirect to your frontend with the JWT (or handle success in another way)
        res.redirect(`<span class="math-inline">\{process\.env\.FRONTEND\_URL\}/dashboard?token\=</span>{jwtToken}`);

    } catch (error) {
        console.error('Error during Google OAuth callback:', error);
        res.redirect(`${process.env.FRONTEND_URL}/error`); // Redirect to an error page
    }
});

module.exports = router;