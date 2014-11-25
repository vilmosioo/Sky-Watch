'use strict';

var db = require('../db');

module.exports = function(req, res){
	db.NGC.get(req.params.id || 1, function(err, rows){
		if(err){
			return res.send(400, err);
		}
		res.send(rows);
	});
};