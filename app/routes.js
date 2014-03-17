module.exports = function(app, passport) {
	app.get('/', function(req, res) {
		res.render('../app/views/index.ejs')
	});

	app.get('/login', function(req, res) {
		res.render('../app/views/login.ejs');
	});

	app.get('/signup', function(req, res) {
		res.render('../app/views/signup.ejs');
	});

	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('../app/views/profile.ejs', {
			user : req.user
		});
	});

	app.get('logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/');
		}
	}
}
