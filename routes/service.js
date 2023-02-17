const express = require('express');
const router = express.Router();
const UserCalories = require('../models/userCalories');

router.get('/', (req, res) => {
  res.render('service');
});

router.get('/calculate', (req, res) => {
  res.render('service/calculate')
})

function calculateCalories(age, gender, weight, height, activity) {
  let bmr;
  if (gender === 'male') {
    bmr = 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age);
  } else {
    bmr = 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age);
  }

  let activityFactor;
  switch (activity) {
    case 'Sedentary':
      activityFactor = 1.2;
      break;
    case 'Lightly active':
      activityFactor = 1.375;
      break;
    case 'Moderately active':
      activityFactor = 1.55;
      break;
    case 'Very active':
      activityFactor = 1.725;
      break;
    case 'Extra active':
      activityFactor = 1.9;
      break;
    default:
      activityFactor = 1.2;
  }

  const calorieIntake = Math.round(bmr * activityFactor);

  return calorieIntake;
}

router.post('/calculate', async (req, res) => {
  const { username, age, gender, weight, height, activity } = req.body;

  try {
    const calorieIntake = calculateCalories(age, gender, weight, height, activity);
    const userCalories = new UserCalories({ username, age, gender, weight, height, activity: req.body.activityLevel, calorieIntake });
    await userCalories.save();

    res.render('calculate', { username: username, 
      weight: weight, 
      height: height, 
      gender: gender, 
      calorieIntake: calorieIntake});
  } catch (error) {
    console.error(error);
    res.render('service', { error: error.message });
  }
});

module.exports = router;
