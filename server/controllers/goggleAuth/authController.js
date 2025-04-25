require('../../config/passport');
const passport = require('passport');
const jwt=require('jsonwebtoken');


const googleAuth = passport.authenticate('google-app', { scope: ['profile', 'email'] });

const googleCallback = (req, res, next) => {
  passport.authenticate('google-app', { session: false }, (err, user) => {
    if (err || !user) {
      return res.redirect('/login');
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: 'user'
      },
      process.env.SECRET,
      { expiresIn: '7d' }
    );
    return res.status(200).json({
      message: 'Login successful',
      token
    });
  })(req, res, next);
};


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
