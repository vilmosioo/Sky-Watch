#!/bin/env node
//  OpenShift sample Node application
var express = require('express'),
	bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(function(req, res){
    res.setHeader('Content-Type', 'application/json');
    res.send({message: 'It works!'});    
});

var server = app.listen(process.env.OPENSHIFT_NODEJS_PORT || 8080, process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1", function(){
    console.log('Server listening on ' + server.address().port);
});
