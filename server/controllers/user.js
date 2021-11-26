// imports
const passport = require('passport');

// export all user related routes
module.exports = {
    DisplayLoginPage: async function(req, res) {
        if (!req.user) {
            return res.render('content/user/login', { title: 'Login', page: 'login' });
        }
        // If they are already logged in, redirect to the survey list page
        return res.redirect('/survey/list');
    },
    ProcessLoginPage: async function(req, res) {
        // PROCESS LOGIN PAGE HERE
        // After a user logs in, redirect them to the list page
        return res.redirect('/survey/list');
    },
    DisplayRegisterPage: async function(req, res) {
        if (!req.user) {
            return res.render('content/user/register', { title: 'Register', page: 'register' });
        }
        // If the user is logged in already, redirect them to the list page
        return res.redirect('/survey/list');
    },
    ProcessRegisterPage: async function(req, res, next) {
        console.log("Process Register Started");
        // Process the register of the user here
        passport.authenticate('signup', function (err, user, info) {
            console.log(err, user, info); // TESTING LINE
            console.log("Inside passport.authenticate");
            if (err) {
                return next(err);
            }
            // If the user exists, show error message with flash (happens through passport in routes/user.js)
            if (!user) {
                console.log("User Already Exists");
                return res.render('content/user/register', { title: 'Register', page: 'register' });
            }
            // If successful, redirect to the login page
            console.log("Redirect should happen now.");
            return res.redirect('/user/login');
        })(req, res, next);
    },
    // Log the user out by destorying the session and redirecting them back to the login page.
    ProcessLogout: async function(req, res) {
        // PROCESS LOGOUT OF USER HERE
        req.session.destroy((err) => {
            if (err) {
                return err;
            }
            // Redirect back to login page after logout.
            return res.redirect('/user/login');
        })
    }
};