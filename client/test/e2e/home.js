'use strict';

describe('Home Page', function() {

	var homePage = require('./pages/home.js');

	afterEach(function(){
		browser.sleep(1000);
	});

	it('should load', function() {
		homePage.get();
		expect(browser.getCurrentUrl()).toContain(homePage.path());
	});

	it('should display more items', function(){
		expect(homePage.cardsElements().count()).toBe(5);
		homePage.loadMoreElement().click();
		expect(homePage.cardsElements().count()).toBe(10);
		homePage.loadMoreElement().click();
		expect(homePage.cardsElements().count()).toBe(15);
	});
});
