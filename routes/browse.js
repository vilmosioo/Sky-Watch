'use strict';

var models = require('../models'),
	sequelize = require('sequelize'),
	extend = require('extend'),
	julian = require('julian'),
	shuffle = require('../scripts/shuffle');

module.exports = function(req, res){
	// get ngc (limit)
	var now = julian(new Date());
	sequelize.Promise.all([
		models.NGC.findAll({ include: [models.Name]}), // maybe attach the names after splice-ing?
		models.Planet.findAll({ // this is not DRY
			include: [{
				model: models.Ephemerid,
				where: {
					JD: {
						between: [now - 1, now + 1] // retrieving ephemerids for +-1 day
					}
				}
			}]
		})
	]).then(function(results){
		res.send({
			title: 'Browse',
			results: shuffle(results.reduce(function(a, b){
				return a.concat(b);
			})).splice(0, req.options.limit)
		});
	});
};