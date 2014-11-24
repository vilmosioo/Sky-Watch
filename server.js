#!/bin/env node
//  OpenShift sample Node application
var express = require('express'),
	bodyParser = require('body-parser'),
	routes = require('./routes');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
	
app.get('/ngc/:id', routes.ngc);

var server = app.listen(process.env.OPENSHIFT_NODEJS_PORT || 8080, process.env.OPENSHIFT_NODEJS_IP, function(){
	console.log('Server listening on ' + server.address().port);
});