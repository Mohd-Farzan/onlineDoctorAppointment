// backend/passport.js
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("./models/User"); // Your Mongoose model

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.findById(id).then(user => done(null, user)));

passport.use(new GoogleStrategy({
    clientID: "GOOGLE_CLIENT_ID",
    clientSecret: "GOOGLE_CLIENT_SECRET",
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    let user = await User.findOne({ googleId: profile.id });
    if (!user) {
      user = await User.create({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value
      });
    }
    return done(null, user);
  }
));

passport.use(new FacebookStrategy({
    clientID: "FACEBOOK_APP_ID",
    clientSecret: "FACEBOOK_APP_SECRET",
    callbackURL: "/auth/facebook/callback",
    profileFields: ["id", "emails", "name", "displayName"]
  },
  async (accessToken, refreshToken, profile, done) => {
    let user = await User.findOne({ facebookId: profile.id });
    if (!user) {
      user = await User.create({
        facebookId: profile.id,
        name: profile.displayName,
        email: profile.emails?.[0]?.value || ""
      });
    }
    return done(null, user);
  }
));
