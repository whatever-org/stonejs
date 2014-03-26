'use strict';

/**
* Module dependencies.
*/
var mongoose = require('mongoose'),
	User = mongoose.model('User');

exports.profile = function(req, res){
	res.render('users/profile', {
		user : req.user
	});
};

exports.logout = function(req, res){
	req.logout();
	res.redirect('/');
};

exports.login = function(req, res) {
	res.render('users/login', {
		message: req.flash('loginMessage')
	});
};

exports.signup = function(req, res) {
	res.render('users/signup', { message: req.flash('signupMessage') });
};
