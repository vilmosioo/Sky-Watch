'use strict';

var fs = require('fs'),
	trim = function(str){
		return (str || '').trim();
	};

module.exports = fs.readFileSync('./data/SAC_DeepSky_Ver81_QCQ.TXT').toString().split(/\r?\n/).map(function(line, index){
	line = line.replace(/"/g, '').replace(/\s+/g, ' ').split(',');
	index = index + 1;

	var RA = trim(line[4]).split(' '),
		DE = trim(line[5]).split(' ');

	return {
		NGC: {
			id: index,
			type: trim(line[2]),
			constellation: trim(line[3]).toLowerCase(),
			RAh: RA[0],
			RAm: RA[1],
			DEd: DE[0],
			DEm: DE[1],
			magnitude: trim(line[6]),
			size_max: trim(line[10]),
			size_min: trim(line[11]),
			number_of_stars: trim(line[14]),
			class: trim(line[13])
		},
		Names: [line[0], line[1]].map(function(str){
			return {
				ngc: index,
				name: trim(str)
			};
		})
	};
});