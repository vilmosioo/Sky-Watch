'use strict';

var NGC = require('../db').NGC,
	options = {
		orderby: {
			'magnitude': ['magnitude'],
			'RA': ['RAh', 'RAm'],
			'DE': ['DEh', 'DEm']
		},
		desc: ['ASC', 'DESC']
	};

module.exports = function(req, res){
	if(req.params.id){
		NGC.get(req.params.id, function(err, rows){
			if(err){
				return res.send(400, err);
			}
			res.send(rows);
		});	
	} else {
		NGC.all({
			limit: (req.param('limit') && isFinite(req.param('limit')) && req.param('limit') < 50) ? req.param('limit') : 10,
			offset: req.param('offset') && isFinite(req.param('offset')) ? req.param('offset') : 0,
			orderby: options.orderby[req.param('orderby')] || options.orderby['magnitude'],
			desc: (req.param('desc') && options.desc.indexOf(req.param('desc')) !== -1) ? req.param('desc') : options.desc[0]
		}, function(err, rows){
			if(err){
				return res.send(400, err);
			}
			res.send(rows);
		});	
	}
};