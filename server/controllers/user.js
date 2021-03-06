// imports
const passport = require('passport');

// export all user related routes
module.exports = {
    DisplayLoginPage: function(req, res) {
        if (!req.user) {
            return res.render('content/user/login', { title: 'Login', page: 'login', user: req.user });
        }
        // If they are already logged in, redirect to the survey list page
        return res.redirect('/take/list');
    },
    ProcessLoginPage: function(req, res) {
        // PROCESS LOGIN PAGE HERE
        // After a user logs in, redirect them to the list page
        return res.redirect('/take/list');
    },
    DisplayRegisterPage: function(req, res) {
        if (!req.user) {
            return res.render('content/user/register', { title: 'Register', page: 'register', user: req.user });
        }
        // If the user is logged in already, redirect them to the list page
        return res.redirect('/take/list');
    },
    ProcessRegisterPage: function(req, res, next) {
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
                return res.render('content/user/register', { title: 'Register', page: 'register', user: req.user });
            }
            // If successful, redirect to the login page
            console.log("Redirect should happen now.");
            res.redirect('/user/login');
        })(req, res, next);
    },
    // Log the user out by destorying the session and redirecting them back to the login page.
    ProcessLogout: function(req, res) {
        // PROCESS LOGOUT OF USER HERE
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
                return err;
            }
            // Redirect back to login page after logout.
            return res.redirect('/user/login');
        })
    }
};