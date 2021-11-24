// Export all routes for our index pages.
module.exports = {
    DisplayHomePage: function(req, res) {
        res.render('content/index', { title: 'Home', page: 'home' });
    },
    DisplayAboutPage: function(req, res) {
        res.render('content/about', { title: 'About Us', page: 'about' });
    }, 
    DisplayContactPage: function(req, res) {
        res.render('content/contact', { title: 'Contact', page: 'contact' });
    },
    DisplaySurveyPage: function(req, res) {
        res.render('content/survey', { title: 'Survey', page: 'survey' });
    }
};