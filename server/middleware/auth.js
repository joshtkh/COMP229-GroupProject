// Handles passport authentication
// UNFINISHED FILE~~~~~~~~~~~~~~~~~~~~~
// BEING WORKED ON BY JOSH HARDING, PLEASE MESSAGE ME IF YOU WISH TO CHANGE/ADD TO THIS FILE

const passport = require("passport");
const passportLocal = require("passport-local");
const UserModel = require("../models/user");

// store locally, so we need a local stratedgy
const LocalStrategy = passportLocal.Strategy;
const strategyOptions = {
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true
};

// ASYNC LOGIN FUNCTION. Needs ASYNC because our USER MODELS need to use AWAIT when performing a search.
const loginFunction = async (req, username, password, done) => {
    try {
        console.log("ENTERED LOGIN FUNCTION");
        // First search for the user
        const user = await UserModel.findOne({ username });
        console.log(user);
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
    } catch (error) {
        console.log("Auth.js: Error inside login function.", error);
        return done(error);
    }
};

// Signup function
const signupFunction = async (req, username, password, done) => {
    try {
        console.log("ENTERED SIGNUP FUNCTION");
        // deconstruct data from request
        const { username, password, email } = req.body;
        console.log(req.body); // Testing line
        console.log("Inside Signup Function");

        if (!username || !password || !email) {
            console.error("Auth.js: Invalid request body fields.");
            return done(null, false);
        }

        const query = {
            $or: [{ username: username }, { email: email }]
        };
        console.log(query); // Testing line
        // Check to see if the user exists already
        const user = await UserModel.findOne(query);
        console.log(user);
        // If user exists, send an error
        if(user) {
            console.log('Auth.js: User already exists');
            console.log(user);
            return done(null, false);
        } else {
            // User doesn't exist, so we create a new one
            const userData = {
                username,
                password,
                email
            }

            const newUser = new UserModel(userData);
            await newUser.save();

            return done(null, newUser);
        }
    } catch(error) {
        console.log("Error in auth.js signup function.");
        return done(error);
    }
}

console.log("Passport setup success");
// Assign our functions to work with passport
passport.use('login', new LocalStrategy(strategyOptions, loginFunction));
passport.use('signup', new LocalStrategy(strategyOptions, signupFunction));

// Custom function that checks if a user is logged in
const isLoggedIn = (req, res, done) => {
    if(!req.user) {
        // If the user isn't logged in, redirect to the log in page.
        return res.redirect('/user/login');
    }
    // Otherwise, user is logged in
    return done(null, req.user);
}

// Serialize/Deserialize users with passport
passport.serializeUser((user, done) => {
    return done(null, user._id);
});
passport.deserializeUser((userId, done) => {
    UserModel.findById(userId, function (err, user) {
        return done(err, user);
    });
});

// Now we need to export passport & our isLoggedIn function
module.exports = { passport, isLoggedIn };