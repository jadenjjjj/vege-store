const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { username, age, gender, weight, height, activity } = req.body;
  const calorieIntake = req.body.calorieIntake;

router.get('/', (req, res) => {
    res.render('calculate');
  });
  
router.get('/products', (req, res) => {
    res.redirect('/products');
  });
  
router.get('/service', (req, res) => {
    res.redirect('/service');
  });

  res.render('calculate', { 
    username, 
    age, 
    gender, 
    weight, 
    height, 
    activity, 
    calorieIntake 
  });
});

module.exports = router;

