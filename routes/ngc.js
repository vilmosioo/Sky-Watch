'use strict';

var models = require('../models'),
	extend = require('extend');

module.exports = function(req, res){
	models.NGC.get(req.options).then(function(ngcs){
		res.send(extend({
			title: 'New General Catalogue and Index Catalogue',
			results: ngcs || []
		}, req.options));
	}, function(err){
		res.send(400, err)
	});
};