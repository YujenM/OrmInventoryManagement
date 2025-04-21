const googleSignupService = require('../services/googleAuth/authService');
const  passport = require('passport');


const GoogleStrategy = require('passport-google-oauth20').Strategy;
console.log('Google Strategy Loaded', GoogleStrategy);

    passport.use('google-app',new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    }, async (accessToken, refreshToken, profile, done) => {
        try {
        const userData = {
            name: profile.displayName,
            email: profile.emails[0].value,   
            password: 'google_oauth_default',
            address: 'Not Provided'
        };
    
        const { user } = await googleSignupService(userData);
    
        return done(null, user);
        } catch (err) {
        return done(err, null);
        }
    }));
