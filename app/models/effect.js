var mongoose = require('mongoose'),
	bcrypt = require('bcrypt-nodejs');

var effectSchema = mongoose.Schema({
	local: {
		name: String,
		description: String
	}
})

module.exports = mongoose.model('Effect', effectSchema);
