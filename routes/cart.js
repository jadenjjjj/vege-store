const express = require('express');
const router = express.Router();

// initialize cart array
let cart = [];

// add a product to the cart
router.post('/', (req, res) => {
  const product = {
    title: req.body.title,
    price: req.body.price
  };
  cart.push(product);
  res.send(product);
});

// get the contents of the cart
router.get('/', (req, res) => {
  res.send(cart);
});

module.exports = router;
