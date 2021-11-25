// import express & router controllers
const express = require('express');
const { DisplayLoginPage, ProcessLoginPage, DisplayRegisterPage, ProcessRegisterPage, ProcessLogout } = require("../controllers/user");
const { passport } = require('../middleware/auth');
// setup router for export
const router = express.Router();

// GET ALL USER RELATED ROUTES
// Login routes
router.get('/login',  DisplayLoginPage);
// process the login page with the help of passport
router.post('/login', passport.authenticate('login', {
    successRedirect: '/survey/list',
    failureRedirect: '/user/login',
    failureFlash: true
}), ProcessLoginPage);


// Register Routes
router.get('/register', DisplayRegisterPage);
router.post('/register', ProcessRegisterPage);

// Logout route
router.get('/logout', ProcessLogout);

// EXPORTS
module.exports = router;