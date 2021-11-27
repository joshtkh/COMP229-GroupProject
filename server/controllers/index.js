// Export all routes for our index pages.
module.exports = {
    DisplayHomePage: function(req, res) {
        res.render('content/index', { title: 'Home', page: 'home', user: req.user });
    },
    DisplayAboutPage: function(req, res) {
        res.render('content/about', { title: 'About Us', page: 'about', user: req.user });
    }, 
    DisplayContactPage: function(req, res) {
        res.render('content/contact', { title: 'Contact', page: 'contact', user: req.user });
    }
};