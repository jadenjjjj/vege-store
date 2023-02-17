const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// initialize cart array
let cart = [];

// retrieve all products
router.get('/', async (req, res) => {
    try {
      const products = await Product.find();
      res.render('products1', { products, cart });
    } catch (error) {
      console.log(error);
      res.status(500).send('Error retrieving products');
    }
  });
  

// retrieve a single product
router.get('/:productId', async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error retrieving product');
  }
});

// add a product to the cart
router.post('/cart', (req, res) => {
  const title = req.body.title;
  const price = req.body.price;
  const quantity = (cart[title] || 0) + 1; // Increment the quantity by 1

  cart[title] = {
    title: title,
    price: price,
    quantity: quantity
  };

  res.redirect('/');
});


// checkout the cart
router.post('/checkout', (req, res) => {
  // process payment and clear cart
  cart = [];
  res.send('Order placed successfully!');
});

// add a new product
router.post('/products', async (req, res) => {
  try {
    const product = new Product({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image
    });
    await product.save();
    res.redirect('/products');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error adding product');
  }
});

// update a product
router.put('/:productId', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.productId, {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image
    }, { new: true });
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error updating product');
  }
});

// delete a product
router.delete('/:productId', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.productId);
    res.send('Product deleted successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error deleting product');
  }
});

module.exports = router;
