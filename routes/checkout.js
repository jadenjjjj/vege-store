const express = require('express');
const router = express.Router();

// initialize cart array
let cart = [];

// process the order and clear the cart
router.post('/', (req, res) => {
  // process payment and send email confirmation
  // ...
  
  // clear the cart
  cart = [];

  res.send('Order placed successfully!');
});

module.exports = router;
