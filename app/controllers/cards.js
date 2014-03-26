'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Card = mongoose.model('Card');

exports.index = function(req, res){
	res.render('cards/index', {
		cards : Card.find()
	});
}

exports.add = function(req, res){
	res.render('cards/add');
}
