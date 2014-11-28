'use strict';

var models = require('../models');

module.exports = function(req, res){
	models.Planet.findAll().then(function(planets){
		res.send({
			title: 'Planets',
			results: planets || []
		});
	}, function(err){
		res.send(400, err)
	});
};