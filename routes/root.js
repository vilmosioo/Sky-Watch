'use strict';

var models = require('../models'),
	sequelize = require('sequelize'),
	extend = require('extend');

module.exports = function(req, res){
	sequelize.Promise.all([
		models.NGC.get(),
		models.Planet.get()
	]).then(function(results){
		res.send(extend({
			results: results
				.reduce(function(a, b){
					return a.concat(b);
				})
				.sort(function(a, b){
					var i, l, field, desc;
					// compare each term one after the other
					for(i = 0, l = req.options.order.length; i < l; i++){
						field = req.options.order[i][0];
						desc = req.options.order[i][1];
						if(a[field] !== b[field]){
							return (a[field] || 99) < (b[field] || 99) ? -1 : 1;
						}
					}
					// all terms equal
					return 0;
				})
				.splice(req.options.offset, req.options.limit)
		}, req.options));
	});
};