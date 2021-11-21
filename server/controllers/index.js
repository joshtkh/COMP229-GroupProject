// Export all routes for our index pages.
module.exports = {
    DisplayHomePage: function(req, res, next) {
        res.render('content/index', { title: 'Home', page: 'home' });
    },
    DisplayAboutPage: function(req, res, next) {
        res.render('content/about', { title: 'About Us', page: 'about' });
    }, 
    DisplayContactPage: function(req, res, next) {
        res.render('content/contact', { title: 'Contact', page: 'contact' });
    },
    DisplaySurveyPage: function(req, res, next) {
        res.render('content/survey', { title: 'Survey', page: 'survey' });
    },
    DisplayLoginPage: function(req, res, next) {
        res.render('content/login', { title: 'Login', page: 'login' });
    }
};