'use strict';

describe('Search test', function() {

  var homePage = require('./pages/home.js'), searchPage = require('./pages/search.js');

  afterEach(function(){
    browser.sleep(2000);
  });

  it('should display the search page', function() {
    homePage.get();
    expect(browser.getCurrentUrl()).toContain(homePage.path());

    // perform search
    homePage.searchElement().sendKeys('Jup');
    homePage.searchElement().sendKeys(protractor.Key.ENTER);

    expect(browser.getCurrentUrl()).toContain(searchPage.path());
  });
});
