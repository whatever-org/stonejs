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
	isGold: {type: Boolean, default: false},
	rarity: {type: String, enum: ['Basic', 'Common', 'Rare', 'Epic', 'Legendary']},
	dustCost: { creation: Number, destruction: Number}
})

module.exports = mongoose.model('Card', cardSchema);
