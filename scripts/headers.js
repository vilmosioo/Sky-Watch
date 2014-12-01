'use strict';

module.exports = function(req, res, next){
	res.setHeader('Content-Type', 'application/json');
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Cache-Control', 'max-age='+(6*24*3600)+', public');
	res.setHeader('X-JSHINT', 'True');
	next();
};