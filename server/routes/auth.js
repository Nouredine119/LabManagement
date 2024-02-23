const express = require('express');
const passport = require('../config/passport'); // Adjust the path accordingly

const router = express.Router();

// Authenticate with Google
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback after Google has authenticated the user
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
   
    res.send('login success');
  }
);

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Other routes...

module.exports = router;
