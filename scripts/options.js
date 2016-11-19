'use strict';

var options = {
	orderby: {
		'magnitude': ['magnitude'],
		'RA': ['RAh', 'RAm'],
		'DE': ['DEd', 'DEm']
	},
	desc: {
		'ASC': 'ASC',
		'DESC': 'DESC'
	}
};

module.exports = function(req, res, next){
	req.options = {
		limit: (req.params.limit && isFinite(req.params.limit) && req.params.limit <= 50) ? req.params.limit : 10,
		offset: req.params.offset && isFinite(req.params.offset) ? req.params.offset : 0,
		order: (options.orderby[req.params.orderby] || options.orderby.magnitude).map(function(field){
			return [field, options.desc[req.params.desc] || options.desc.ASC];
		})
	};

	next();
};