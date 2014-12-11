'use strict';

var models = require('../models'),
	sequelize = require('sequelize'),
	shuffle = require('../scripts/shuffle');

module.exports = function(req, res){
	sequelize.Promise.all([
		models.NGC.get(), // maybe attach the names after splice-ing?
		models.Planet.get()
	]).then(function(results){
		res.send({
			title: 'Browse',
			total: 1000,
			limit: req.options.limit,
			results: shuffle(results.reduce(function(a, b){
				return a.concat(b);
			})).splice(0, req.options.limit)
		});
	});
};