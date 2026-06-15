const express = require('express');
const router = express.Router();
const passport = require('passport');

// Initiate GitHub OAuth login
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// GitHub OAuth callback
router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/auth/profile');
  }
);

// View logged-in user profile
router.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Not logged in. Visit /auth/github to login.' });
  }
  res.status(200).json({
    message: 'Logged in successfully',
    user: {
      id: req.user.id,
      username: req.user.username,
      displayName: req.user.displayName
    }
  });
});

// Logout
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

module.exports = router;