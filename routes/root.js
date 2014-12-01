'use strict';

var models = require('../models'),
	sequelize = require('sequelize'),
	julian = require('julian'),
	extend = require('extend');

module.exports = function(req, res){
	var now = julian(new Date());
	sequelize.Promise.all([
		models.NGC.findAll(extend({
			include: [models.Name]
		}, req.options)), // maybe attach the names after splice-ing?
		models.Planet.get()
	]).then(function(results){
		res.send(extend({
			results: results.reduce(function(a, b){
				return a.concat(b);
			}).splice(0, req.options.limit)
		}, req.options));
	});
};