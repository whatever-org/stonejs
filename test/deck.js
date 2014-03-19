'use strict';
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.should();
chai.use(sinonChai);
var Card = require('../app/models/card');
var Deck = require('../app/models/deck');

/* Cards sample */
var cards = [
	new Card({remoteId: 1, name: 'un', cost: 1, attack: 1, health: 1, description: 'weak'}),
	new Card({remoteId: 2, name: 'deux', cost: 2, attack: 2, health: 2, description: 'weak'}),
	new Card({remoteId: 3, name: 'trois', cost: 3, attack: 2, health: 3, description: 'weak'}),
	new Card({remoteId: 4, name: 'quatre', cost: 1, attack: 1, health: 1, description: 'weak'}),
	new Card({remoteId: 5, name: 'cinq', cost: 4, attack: 1, health: 1, description: 'weak'})
]

describe('new deck', function () {
	var deck = new Deck({hero: 1});
	it('should have property type and equals normal', function(){
		deck.should.have.property('type').equal('normal');
	});
	it('should have property hero and equals paladin', function(){
		deck.should.have.property('hero').equal(1);
	});
	it('should have property card_count and equals 0', function(){
		deck.should.have.property('cards_count').equal(0);
	});
	it('should have property cards_container with length equals 0', function(){
		deck.should.have.property('cards_container').with.length(0);
	});
	it('should be a normal deck type', function(){
		deck.isArena().should.equal(false);
	})
});

describe('adding 1 card to deck', function(){
	var deck = new Deck();
	deck.addCard(cards[0].remoteId);
	it('should increment cards count', function(){
		deck.cards_count.should.equal(1);
	});
	it('should create new card', function(){
		deck.cards_container[0].should.have.property('card_id').equal(cards[0].remoteId);
	});
	it('should increment card count', function(){
		deck.cards_container[0].should.have.property('count').equal(1);
	})
});

describe('adding 2 differents cards to deck', function(){
	var deck = new Deck();
	deck.addCard(cards[0].remoteId);
	deck.addCard(cards[1].remoteId);
	it('should increment cards count', function(){
		deck.cards_count.should.equal(2);
	});
	it('should create new card', function(){
		deck.cards_container[0].should.have.property('card_id').equal(cards[0].remoteId);
		deck.cards_container[1].should.have.property('card_id').equal(cards[1].remoteId);
	});
	it('should increment card count', function(){
		deck.cards_container[0].should.have.property('count').equal(1);
		deck.cards_container[1].should.have.property('count').equal(1);
	})
});

describe('adding 1 & 2 differents cards to deck', function(){
	var deck = new Deck();
	deck.addCard(cards[0].remoteId);
	deck.addCard(cards[1].remoteId);
	deck.addCard(cards[0].remoteId);
	it('should increment cards count', function(){
		deck.cards_count.should.equal(3);
	});
	it('should create new card', function(){
		deck.cards_container[0].should.have.property('card_id').equal(cards[0].remoteId);
		deck.cards_container[1].should.have.property('card_id').equal(cards[1].remoteId);
		deck.cards_container.length.should.equal(2);
	});
})
