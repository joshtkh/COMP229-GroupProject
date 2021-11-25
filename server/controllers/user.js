// export all user related routes
module.exports = {
    DisplayLoginPage: async function(req, res) {
        res.render('content/user/login', { title: 'Login', page: 'login' });
    },
    ProcessLoginPage: async function(req, res) {
        // PROCESS LOGIN PAGE HERE
    },
    DisplayRegisterPage: async function(req, res) {
        res.render('content/user/register', { title: 'Register', page: 'register' });
    },
    ProcessRegisterPage: async function(req, res) {
        // Process the register of the user here
    },
    ProcessLogout: async function(req, res) {
        // PROCESS LOGOUT OF USER HERE
    }
};