'use strict';

var models = require('../models'),
	sequelize = require('sequelize'),
	julian = require('julian');

module.exports = function(req, res){
	var now = julian(new Date()),
		q = req.param('q');

	if(!q){
		res.send(400, {
			message: 'Please provide a search query in the form of /search?q=[your query]'
		})
	}

	sequelize.Promise.all([
		models.Planet.findAll({
			where: ['LOWER(name) LIKE ?', '%' + q.replace(/\s+/, '%').trim().toLowerCase() + '%'],
			include: [{
				model: models.Ephemerid,
				where: {
					JD: {
						between: [now - 1, now + 1] // retrieving ephemerids for +-1 day
					}
				}
			}]
		}),
		models.NGC.findAll({
			include: [{
				model: models.Name,
				where: ['LOWER(name) LIKE ?', '%' + q.replace(/\s+/, '%').trim().toLowerCase() + '%'],	
			}]
		})
	]).then(function(results){
		res.send({
			title: 'Search results for: ' + q,
			limit: req.options.limit,
			results: results.reduce(function(a, b){
				return a.concat(b);
			}) || []
		});	
	}, function(err){
		res.send(400, err);
	});	
};