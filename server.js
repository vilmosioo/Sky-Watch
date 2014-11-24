#!/bin/env node
//  OpenShift sample Node application
var express = require('express');


//  Set the environment variables we need.
var host = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

if (!host){
    console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
};

var app = express();

app.use(function(req, res){
    res.setHeader('Content-Type', 'application/json');
    res.send({message: 'It works!'});    
});

app.listen(port, host, function(){
    console.log('Server listening on ' + port);
});
