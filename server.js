'use strict';

var express = require('express'),
	bodyParser = require('body-parser'),
	logger = require('morgan'),
	routes = require('./routes');

var app = express();
app.use(logger('combined'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(function(req, res, next){
	res.setHeader('Content-Type', 'application/json');
	res.setHeader('Access-Control-Allow-Origin', '*');
	// res.setHeader('Cache-Control', 'max-age='+(6*24*3600)+', public');
	next();
});	
app.get('/ngc/:id?', routes.ngc);
app.use(function(req, res){
	res.send(404);
});

var server = app.listen(process.env.OPENSHIFT_NODEJS_PORT || 8080, process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1', function(){
	console.log('Server listening on ' + server.address().address + ':' + server.address().port);
});