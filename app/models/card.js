var mongoose = require('mongoose'),
	bcrypt = require('bcrypt-nodejs');

var cardSchema = mongoose.Schema({
	remoteId: Number,
	name: String,
	cost: Number,
	attack: Number,
	health: Number,
	description: String,
	effects: Array,
	isGold: {type: Boolean, default: false}
})

module.exports = mongoose.model('Card', cardSchema);
