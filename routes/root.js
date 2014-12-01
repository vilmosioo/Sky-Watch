'use strict';

var models = require('../models'),
	sequelize = require('sequelize');

module.exports = function(req, res){
	sequelize.Promise.all([
		models.NGC.get(req.options),
		models.Planet.get()
	]).then(function(results){
		res.send(extend({
			results: results.reduce(function(a, b){
				return a.concat(b);
			}).splice(0, req.options.limit)
		}, req.options));
	});
};