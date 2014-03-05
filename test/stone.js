var assert = require('assert');
var Card = require('../lib/Card');
var Deck = require('../lib/Deck');
var testsCompleted = 0;

/* Cards sample */
var cards = [
	new Card(1, 'un', 1, 1, 1, 'weak', null),
	new Card(2, 'deux', 1, 2, 3, 'weak', null),
	new Card(3, 'trois', 4, 4, 5, 'weak', null),
	new Card(4, 'quatre', 6, 7, 6, 'weak', null),
	new Card(5, 'cinq', 8, 8, 8, 'weak', null)
]

cards.forEach(function(x, i){
	console.log(x);
	console.log(i);
})

function deckCountAllCards(){
	var deck = new Deck();
	assert.equal(deck.cards_count, 0, 'deck count should be 0');
	testsCompleted++;
}

function deckAddCard(){
	var deck = new Deck();
	deck.addCard(cards[0].id);
	assert.equal(deck.cards_count, 1, 'deck count should be 1');
	deck.addCard(cards[1].id);
	assert.equal(deck.cards_count, 2, 'deck count should be 2');
	testsCompleted++;
}

function deckRemoveCard(){
	var deck = new Deck();
	deck.addCard(cards[0].id);
	deck.addCard(cards[1].id);
	deck.addCard(cards[3].id);
	deck.removeCard(cards[1].id);
	assert.equal(deck.cards_count, 2, 'deck count should be 2');
	testsCompleted++;
}

function deckCardCountOneCard(){
	var deck = new Deck();
	deck.addCard(cards[0].id);
	deck.addCard(cards[0].id);
	deck.addCard(cards[1].id);
	deck.addCard(cards[3].id);
	deck.addCard(cards[3].id);
	deck.addCard(cards[3].id);
	deck.addCard(cards[3].id);

	assert.equal(deck.getCardCount(cards[0].id), 2, 'card count should be 2');
	assert.equal(deck.getCardCount(cards[1].id), 1, 'card count should be 1');
	assert.equal(deck.getCardCount(cards[3].id), 4, 'card count should be 4');
	testsCompleted++;
}

deckCountAllCards();
deckAddCard();
deckRemoveCard();
deckCardCountOneCard();
console.log('Completed ' + testsCompleted + ' tests');
