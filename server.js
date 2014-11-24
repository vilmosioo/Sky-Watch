#!/bin/env node
//  OpenShift sample Node application
var express = require('express'),
	bodyParser = require('body-parser'),
	mysql = require('mysql');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

var connection = mysql.createConnection({
	host: process.env.OPENSHIFT_MYSQL_DB_HOST,
	port: process.env.OPENSHIFT_MYSQL_DB_PORT,
	user: process.env.OPENSHIFT_MYSQL_DB_USERNAME,
	password: process.env.OPENSHIFT_MYSQL_DB_PASSWORD,
	database: 'skywatch'
});
connection.connect();
	
app.use(function(req, res){
	connection.query('SELECT * FROM `ephemerid` WHERE id=1', function(err, rows, fields){
		res.setHeader('Content-Type', 'application/json');
		if(err){
			return res.send(400, err);
		}
		res.send(rows);
	});
});

var server = app.listen(process.env.OPENSHIFT_NODEJS_PORT || 8080, process.env.OPENSHIFT_NODEJS_IP, function(){
	console.log('Server listening on ' + server.address().port);
});