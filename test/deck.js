'use strict';
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.should();
chai.use(sinonChai);
var Card = require('../lib/Card');
var Deck = require('../lib/Deck');

/* Cards sample */
var cards = [
	new Card(1, 'un', 1, 1, 1, 'weak', null),
	new Card(2, 'deux', 1, 2, 3, 'weak', null),
	new Card(3, 'trois', 4, 4, 5, 'weak', null),
	new Card(4, 'quatre', 6, 7, 6, 'weak', null),
	new Card(5, 'cinq', 8, 8, 8, 'weak', null)
]

describe('new deck', function () {
	var deck = new Deck('normal', 'paladin');
	it('should have property type and equals normal', function(){
		deck.should.have.property('type').equal('normal');
	});
	it('should have property hero and equals paladin', function(){
		deck.should.have.property('hero').equal('paladin');
	});
	it('should have property card_count and equals 0', function(){
		deck.should.have.property('cards_count').equal(0);
	});
	it('should have property cards_container with length equals 0', function(){
		deck.should.have.property('cards_container').with.length(0);
	});
});

describe('adding 1 card to deck', function(){
	var deck = new Deck();
    deck.addCard(cards[0].id);
    it('should increment cards count', function(){
		deck.cards_count.should.equal(1);
    });
    it('should create new card', function(){
		deck.cards_container[0].should.have.property('card_id').equal(cards[0].id);
    });
    it('should increment card count', function(){
    	deck.cards_container[0].should.have.property('count').equal(1);
    })
});

describe('adding 2 differents cards to deck', function(){
	var deck = new Deck();
	deck.addCard(cards[0].id);
	deck.addCard(cards[1].id);
    it('should increment cards count', function(){
		deck.cards_count.should.equal(2);
    });
    it('should create new card', function(){
		deck.cards_container[0].should.have.property('card_id').equal(cards[0].id);
		deck.cards_container[1].should.have.property('card_id').equal(cards[1].id);
    });
    it('should increment card count', function(){
    	deck.cards_container[0].should.have.property('count').equal(1);
    	deck.cards_container[1].should.have.property('count').equal(1);
    })
});

describe('adding 1 & 2 differents cards to deck', function(){
	var deck = new Deck();
	deck.addCard(cards[0].id);
	deck.addCard(cards[1].id);
	deck.addCard(cards[0].id);
	it('should increment cards count', function(){
		deck.cards_count.should.equal(3);
	});
    it('should create new card', function(){
		deck.cards_container[0].should.have.property('card_id').equal(cards[0].id);
		deck.cards_container[1].should.have.property('card_id').equal(cards[1].id);
		deck.cards_container.length.should.equal(2);
    });
})
