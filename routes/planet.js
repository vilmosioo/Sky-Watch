'use strict';

var models = require('../models'),
	julian = require('julian');

module.exports = function(req, res){
	var now = julian(new Date());
	models.Planet.findAll({
		include: [{
			model: models.Ephemerid,
			where: {
				JD: {
					between: [now - 1, now + 1] // retrieving ephemerids for +-1 day
				}
			}
		}]
	}).then(function(planets){
		res.send({
			title: 'Planets',
			results: planets || []
		});
	}, function(err){
		res.send(400, err)
	});
};