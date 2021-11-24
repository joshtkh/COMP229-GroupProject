// Handles passport authentication
// UNFINISHED FILE~~~~~~~~~~~~~~~~~~~~~
// BEING WORKED ON BY JOSH HARDING, PLEASE MESSAGE ME IF YOU WISH TO CHANGE/ADD TO THIS FILE

const passport = require("passport");
const passportLocal = require("passport-local");
const UserModel = require("/../models/user");

// store locally, so we need a local stratedgy
const LocalStrategy = passportLocal.Strategy;
const strategyOptions = {
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
};

// ASYNC LOGIN FUNCTION. Needs ASYNC because our USER MODELS need to use AWAIT when performing a search.
const loginFunction = (req, username, password, done) => async function() {
    // First search for the user
    const user = await UserModel.findOne({username});

    // if the user doesn't exist, send an error
    if (!user) {
        return done(null, false, { message: "User does not exist." });
    }
    // If the password isn't valid, send a different error.
    if (!(await user.isValidPassword(password))) {
        return done(null, false, { message: "Password is not valid." });
    }
    // If we end up here, the user exists & the password is valid.
    console.log("User authenticated successfully!");
    return done(null, user);
};

