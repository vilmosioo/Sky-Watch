'use strict';

var NGC = require('../scripts/db').NGC;

module.exports = function(req, res){
	res.setHeader('Content-Type', 'application/json');
	NGC.get(req.params.id || 1, function(err, rows){
		if(err){
			return res.send(400, err);
		}
		res.send(rows);
	});
};