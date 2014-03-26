'use strict';

// User routes use users controller
var cards = require('../controllers/cards');
var authorization = require('./middlewares/authorization');

module.exports = function(app) {
	app.get('/cards', cards.index);
	app.get('/cards/add', authorization.mustBeLoggedIn, cards.add);
}
