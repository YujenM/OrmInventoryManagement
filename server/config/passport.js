const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const googleSignupService = require('../services/googleAuth/authService');
const { User } = require('../models'); // Sequelize model

console.log('Google Strategy Loaded', GoogleStrategy);

// Google OAuth Strategy
passport.use(
  'google-app',
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/googleAuth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const userData = {
          name: profile.displayName,
          email: profile.emails[0].value,
          password: 'google_oauth_default',
          address: 'Not Provided',
        };

        const { user } = await googleSignupService(userData);
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// ✅ Serialize the user (store user ID in session)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// ✅ Deserialize the user (fetch full user using ID)
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
