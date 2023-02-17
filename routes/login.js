const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

let loginAttempts = 0;

router.get('/', (req, res) => {
  res.render('login', { loginAttempts: req.session.loginAttempts });
});


router.post('/login', async (req, res) => {
  let loginAttempts = req.session.loginAttempts || 0;
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      // Increment login attempts if user not found
      loginAttempts++;
      req.session.loginAttempts = loginAttempts;
      if (loginAttempts >= 3) {
        return res.render('login', {
          loginAttempts: loginAttempts,
          error: 'Too many failed attempts. Please try again later.'
        });
      } else {
        return res.render('login', {
          loginAttempts: loginAttempts,
          error: 'Invalid username or password'
        });
      }
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // Increment login attempts if password is incorrect
      loginAttempts++;
      req.session.loginAttempts = loginAttempts;
      if (loginAttempts >= 3) {
        return res.render('login', {
          loginAttempts: loginAttempts,
          error: 'Too many failed attempts. Please try again later.'
        });
      } else {
        return res.render('login', {
          loginAttempts: loginAttempts,
          error: 'Invalid username or password'
        });
      }
    }

    // Reset login attempts if login is successful
    req.session.loginAttempts = 0;

    req.session.userId = user._id;
    res.redirect('/service');
  } catch (error) {
    res.status(400).send(error);
  }
});


module.exports = router;
