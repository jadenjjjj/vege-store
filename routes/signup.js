const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res) => {
  res.render('signup');
});

router.post('/', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = new User({ username, email, password });
    await user.save();
    res.redirect('/service');
  } catch (error) {
    if (error.code === 11000) {
      res.render('signup', { error: 'Username already taken' });
    } else {
      console.error(error);
      res.render('signup', { error: error.message });
    }
  }
});

module.exports = router;
