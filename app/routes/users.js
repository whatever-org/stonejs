'use strict';

// User routes use users controller
var users = require('../controllers/users');
var authorization = require('./middlewares/authorization');

module.exports = function(app, passport) {
	app.get('/', function(req, res) {
		res.render('index', { user: req.user });
	});

	app.get('/login', authorization.mustNotBeLoggedIn, users.login);

	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/profile',
		failureRedirect : '/login',
		failureFlash : true
	}));

	app.get('/signup', authorization.mustNotBeLoggedIn, users.signup);

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/profile',
		failureRedirect: '/signup',
		failureFlash : true
	}));

	app.get('/profile', authorization.mustBeLoggedIn, users.profile);

	app.get('/logout', users.logout);
}
