'use strict';

var fs = require('fs'),
	config = require('./../../scripts/config'),
	trim = function(str){
		return (str || '').trim();
	};

module.exports = config.PLANETS.map(function(planet, index){
	var id = index + 1;

	return {
		Planet: {
			id: id,
			name: planet
		},
		Ephemerids: fs.readFileSync('./data/planets/'+planet.toLowerCase()+'.txt').toString().match(/[^\r\n]+/g).map(function(line){
			line = line.replace(/"/g, '').replace(/\s+/g, ' ').split(',');

			var RA = trim(line[1]).split(' '),
				DE = trim(line[2]).split(' ');

			return {
				'planet': id,
				'JD': line[0],
				'RAh': RA[0],
				'RAm': RA[1],
				'RAs': RA[2],
				'DEd': DE[0],
				'DEm': DE[1],
				'DEs': DE[2],
				'size': line[5],
				'magnitude': line[3],
				'constellation': config.CONSTELLATIONS[trim(line[6]).toLowerCase()]
			};
		})
	};
});