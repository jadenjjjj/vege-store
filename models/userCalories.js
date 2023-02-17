const mongoose = require('mongoose');

const userCaloriesSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  activity: {
    type: String,
  },
  calorieIntake: {
    type: Number,
    required: false,
  },
});

const UserCalories = mongoose.model('UserCalories', userCaloriesSchema);

module.exports = UserCalories;
