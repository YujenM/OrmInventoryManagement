require('../../config/passport');
const passport = require('passport');

const googleAuth = passport.authenticate('google-app', { scope: ['profile', 'email'] });

const googleCallback = passport.authenticate('google-app', {
  failureRedirect: '/login',
  successRedirect: '/dashboard'
});

const logout = (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
};

module.exports = {
  googleAuth,
  googleCallback,
  logout
};
