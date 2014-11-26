'use strict';

var NGC = require('../db').NGC;

module.exports = function(req, res){
	if(req.params.id){
		NGC.get(req.params.id, function(err, rows){
			if(err){
				return res.send(400, err);
			}
			res.send(rows);
		});	
	} else {
		NGC.all(req.options, function(err, rows){
			if(err){
				return res.send(400, err);
			}
			res.send({
				limit: req.options.limit,
				offset: req.options.offset,
				orderby: req.options.orderby,
				results: rows	|| []
			});
		});	
	}
};