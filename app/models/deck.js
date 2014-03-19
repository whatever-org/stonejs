var mongoose = require('mongoose'),
	bcrypt = require('bcrypt-nodejs');

var deckSchema = mongoose.Schema({
	type: {type: String, default: 'normal'},
	hero: Number,
	cards_count: {type: Number, default: 0},
	cards_container: Array
})

deckSchema.methods.isArena = function(){
	return this.type === "arena";
}

deckSchema.methods.isComplete = function(){
	return this.cards_count >= 30;
}

deckSchema.methods.addCard = function(card_id){
	var currentCount = this.getCardCount(card_id);
	if(currentCount > 0){
		var cardToUpateIndex = this.cards_container.map(function(e) { return e.card_id; }).indexOf(card_id);
		this.cards_container[cardToUpateIndex].count++;
	} else {
		this.cards_container.push({
			card_id: card_id,
			count: ++currentCount,
		});
	}
	this.cards_count++;
}

deckSchema.methods.getCardCount = function(card_id){
	var card_count = 0;
	this.cards_container.forEach(function(x, i){
		if(card_id === x.card_id){
			card_count++;
		}
	});
	return card_count;
}

deckSchema.methods.removeCard = function(card_id){
	var self = this;
	this.cards_container.forEach(function(x, i){
		if(card_id === x.card_id){
			if(x.count > 1){
				x.count--;
			} else {
				self.cards_container.splice(i, 1);
			}
			self.cards_count--;
		}
	});
}

module.exports = mongoose.model('Deck', deckSchema);
