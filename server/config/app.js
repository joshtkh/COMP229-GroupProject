// Imports
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const MongoStore = require('connect-mongo');
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
// AUTH imports
const flash = require("express-flash");
const passport = require("passport");
const session = require("express-session");
const { isLoggedIn } = require("../middleware/auth");
// Import our DB config
const DBConfig = require("./db");
// REQUIRE DOTENV TO HIDE OUR SECRETS
require("dotenv").config();

// DATABASE CONNECTION OPTIONS (Local/Remote)
// WE ARE PULLING SECRETS FROM OUR .env FILE
// GROUP MEMBER NOTE: YOU NEED TO ADD THE .env FILE YOURSELF TO ACCESS THE REMOTE DATABASE
const connectURI = process.env.MONGO_URI ? process.env.MONGO_URI : DBConfig.LocalURI;
const hostName = process.env.MONGO_URI ? "REMOTE HOST" : "LOCAL HOST";
const dbSecret = process.env.MONGO_SECRET;

// MongoStore Options
const StoreOptions = {
  store: MongoStore.create({
  mongoUrl: connectURI }),
  secret: dbSecret,
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 600000
  }
}

// ROUTER REQUIRES
const indexRouter = require('../routes/index');
const surveyRouter = require('../routes/survey');
const userRouter = require('../routes/user');
const takeSurveyRouter = require('../routes/take-survey');

// DB CONFIGURATION
mongoose.connect(connectURI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
  console.log('connected to MongoDB at: ' + hostName);
});

// REQUIRE OUR EXPRESS APP
const app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// SETUP OF EXPRESS
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

// EJS Layouts SETUP
app.use(expressLayouts);
app.set("layout", "layouts/layout"); // POINT TO OUR DEFAULT LAYOUT FILE

// AUTHENTICATION SETUP
app.use(session(StoreOptions));
// Init passport
app.use(passport.initialize());
app.use(passport.session());
// setup FLASH NOTIFICATIONS
app.use(flash());

// INDEX SETUP
app.use('/', indexRouter);
// USER ROUTER SETUP
app.use('/user', userRouter);
// SURVEY ROUTER SETUP, blocked by authentication (ie, requires user to be logged in)
app.use('/survey', isLoggedIn, surveyRouter);
// PUBLIC route that allows surveys to be filled out and submitted.
app.use('/take', takeSurveyRouter);

// Catch any other route here and give a 404 error
app.get('*', function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Error', message: err.message });
});

// Now export the app
module.exports = app;
