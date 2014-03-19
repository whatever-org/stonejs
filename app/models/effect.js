var mongoose = require('mongoose'),
	bcrypt = require('bcrypt-nodejs');

var effectSchema = mongoose.Schema({
	name: String,
	description: String
})

module.exports = mongoose.model('Effect', effectSchema);
