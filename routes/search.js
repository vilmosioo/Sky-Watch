'use strict';

var models = require('../models'),
	sequelize = require('sequelize');

module.exports = function(req, res){
	var q = req.param('q');

	if(!q || /^\s*$/.test(q)){
		res.send(400, {
			message: 'Please provide a search query in the form of /search?q=[your query]'
		});
	}

	sequelize.Promise.all([
		models.Planet.get({
			where: ['LOWER(name) LIKE ?', '%' + q.replace(/\s+/, '%').trim().toLowerCase() + '%']
		}),
		models.NGC.get({
			include: [{
				model: models.Name,
				where: ['LOWER(name) LIKE ?', '%' + q.replace(/\s+/, '%').trim().toLowerCase() + '%']
			}]
		})
	]).then(function(results){
		results = results.reduce(function(a, b){
			return a.concat(b);
		});

		res.send({
			title: 'Search results for: ' + q,
			limit: req.options.limit,
			offset: req.options.offset,
			total: results.length,
			results: results.splice(req.options.offset, req.options.limit) || []
		});
	}, function(err){
		res.send(400, err);
	});
};