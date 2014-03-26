'use strict';

exports.mustBeLoggedIn = function(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}

exports.mustNotBeLoggedIn = function(req, res, next) {
	if (!req.isAuthenticated())
		return next();

	res.redirect('/');
}

exports.mustBeAdmin = function(req, res, next) {
	if(req.user.role === 'admin'){
		return next();
	}

	res.redirect('/');
}
