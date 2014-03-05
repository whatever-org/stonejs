var Deck = function(type, hero){
	this.type = type;
	this.hero = hero;
	this.cards_count = 0;
	this.cards_container = [];
}

Deck.prototype.isArena = function(){
	return this.type === "arena";
}

Deck.prototype.isComplete = function(){
	return this.cards_count >= 30;
}

Deck.prototype.addCard = function(card_id){
	var currentCount = this.getCardCount(card_id);
	this.cards_container.push({
		card_id: card_id,
		count: currentCount++,
	});
	this.cards_count++;
}

Deck.prototype.getCardCount = function(card_id){
	var card_count = 0;
	this.cards_container.forEach(function(x, i){
		if(card_id === x.card_id){
			card_count++;
		}
	});
	return card_count;
}

Deck.prototype.removeCard = function(card_id){
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

module.exports = Deck;
