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
		models.Planet.get({
			where: ['LOWER(name) LIKE ?', '%' + q.replace(/\s+/, '%').trim().toLowerCase() + '%']
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