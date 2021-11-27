// import express & router controllers
const express = require('express');
const { DisplayHomePage, DisplayAboutPage, DisplayContactPage } = require("../controllers");
// setup router for export
const router = express.Router();

/* GET home page. */
router.get('/', DisplayHomePage);
router.get('/about', DisplayAboutPage);
router.get('/contact', DisplayContactPage);

// EXPORTS
module.exports = router;