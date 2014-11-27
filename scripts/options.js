'use strict';

module.exports = function(req, res, next){
	
	var options = {
		orderby: {
			'magnitude': ['magnitude'],
			'RA': ['RAh', 'RAm'],
			'DE': ['DEd', 'DEm']
		},
		desc: ['ASC', 'DESC']
	};

	req.options = {
		limit: (req.param('limit') && isFinite(req.param('limit')) && req.param('limit') < 50) ? req.param('limit') : 10,
		offset: req.param('offset') && isFinite(req.param('offset')) ? req.param('offset') : 0,
		order: options.orderby[req.param('orderby')] || options.orderby['magnitude']
	};

	next();
};