// import express & router controllers
const express = require('express');
const { DisplayHomePage, DisplayAboutPage, DisplayContactPage,DisplayLoginPage } = require("../controllers");
// setup router for export
const router = express.Router();

/* GET home page. */
router.get('/', DisplayHomePage);
router.get('/home', DisplayHomePage);
router.get('/about', DisplayAboutPage);
router.get('/contact', DisplayContactPage);
router.get('/login',  DisplayLoginPage);

// EXPORTS
module.exports = router;