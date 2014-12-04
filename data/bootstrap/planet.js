'use strict';

var fs = require('fs'),
	config = require('./../../scripts/config'),
	trim = function(str){
		return (str || '').trim();
	};

module.exports = config.PLANETS.map(function(planet, index){
	index = index + 1;

	return {
		Planet: {
			id: index,
			name: planet
		}
	};
});