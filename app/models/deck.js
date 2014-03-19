var mongoose = require('mongoose'),
	bcrypt = require('bcrypt-nodejs');

var deckSchema = mongoose.Schema({
	local: {
		type: String,
		hero: int,
		cards_count: int,
		cards_container: Array
	}
})

deckSchema.methods.isArena = function(){
	return this.local.type === "arena";
}

deckSchema.methods.isComplete = function(){
	return this.local.cards_count >= 30;
}

deckSchema.methods.addCard = function(card_id){
	var currentCount = this.methods.getCardCount(card_id);
	if(currentCount > 0){
		var cardToUpateIndex = this.local.cards_container.map(function(e) { return e.card_id; }).indexOf(card_id);
		this.local.cards_container[cardToUpateIndex].count++;
	} else {
		this.local.cards_container.push({
			card_id: card_id,
			count: ++currentCount,
		});
	}
	this.local.cards_count++;
}

deckSchema.methods.getCardCount = function(card_id){
	var card_count = 0;
	this.local.cards_container.forEach(function(x, i){
		if(card_id === x.card_id){
			card_count++;
		}
	});
	return card_count;
}

deckSchema.methods.removeCard = function(card_id){
	var self = this;
	this.local.cards_container.forEach(function(x, i){
		if(card_id === x.card_id){
			if(x.count > 1){
				x.count--;
			} else {
				self.local.cards_container.splice(i, 1);
			}
			self.local.cards_count--;
		}
	});
}

module.exports = mongoose.model('Deck', deckSchema);
