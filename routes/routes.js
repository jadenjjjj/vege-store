const express = require('express');
const router = express.Router();
const path = require('path');

router.use(express.static('public'))

router.get('/', (req, res) => {
    res.render('index', { title : "Home Page"});
});

router.get('/public/style/index.css', function(req, res) {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, '/public/style/index.css'));
  });
  

module.exports = router;