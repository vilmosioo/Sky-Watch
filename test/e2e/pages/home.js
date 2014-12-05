'use strict';

var HomePage = function(){
	var path = '#/',
		search = element(by.css('[data-test="search-input"]')),
		loadMore = element(by.css('[data-test="load-more"]')),
		cards = element.all(by.repeater('item in list.items'));

	this.get = function(){
		browser.get(path);
		browser.waitForAngular();
	};

	this.path = function(){
		return path;
	};

	this.searchElement = function(){
		return search;
	};

	this.cardsElements = function(){
		return cards;
	};

	this.loadMoreElement = function(){
		return loadMore;
	};
};

module.exports = new HomePage();