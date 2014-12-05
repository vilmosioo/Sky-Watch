'use strict';

var SearchPage = function(){
	var path = '#/search';

	this.get = function(q){
		browser.get(path + '?q=' + q);
		browser.waitForAngular();
	};

	this.path = function(){
		return path;
	};
};

module.exports = new SearchPage();