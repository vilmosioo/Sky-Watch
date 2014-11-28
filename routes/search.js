'use strict';

var models = require('../models');

module.exports = function(req, res){
	var q = req.param('q');
	if(!q){
		res.send(400, {
			message: 'Please provide a search query in the form of /search?q=[your query]'
		})
	}

	models.NGC.findAll({
		include: [{
			model: models.Name,
			where: ['LOWER(name) LIKE ?', '%' + q.replace(/\s+/, '%').trim().toLowerCase() + '%'],	
		}]
	}).then(function(names){
		res.send({
			title: 'Search results for: ' + q,
			limit: req.options.limit,
			results: names
		});	
	}, function(err){
		res.send(400, err);
	});	
};