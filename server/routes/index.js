var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Landing Page' });
});

/* GET home page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About Page' });
});

/* GET home page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact Us Page' });
});

/* GET home page. */
router.get('/survey', function(req, res, next) {
  res.render('survey', { title: 'Create Survey Page' });
});

module.exports = router;