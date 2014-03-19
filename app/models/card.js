var mongoose = require('mongoose'),
	bcrypt = require('bcrypt-nodejs');

var cardSchema = mongoose.Schema({
	local: {
		name: String,
		cost: = int,
		attack: = int,
		health: = int,
		info: = String,
		effects: = Array,
		isGold: = Boolean
	}
})

module.exports = mongoose.model('Card', cardSchema);
