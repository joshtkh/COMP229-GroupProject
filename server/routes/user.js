// import express & router controllers
const express = require('express');
const { DisplayLoginPage, ProcessLoginPage } = require("../controllers/user");
const passport = require('passport');
// setup router for export
const router = express.Router();

// GET ALL USER RELATED ROUTES
router.get('/login',  DisplayLoginPage);
// process the login page with the help of passport
router.post('/login', passport.authenticate('login', {
    successRedirect: '/survey/list',
    failureRedirect: '/user/login',
    failureFlash: true
}), ProcessLoginPage);


// NOT YET IMPLIMENTED:
//router.get('/register', DisplayRegisterPage);
//router.post('/register', ProcessRegisterPage);
//router.get('/logout', ProcessLogout);

// EXPORTS
module.exports = router;