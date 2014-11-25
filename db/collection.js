'use strict';

var mysql = require('mysql'),	
	connection = mysql.createConnection({
		host: process.env.OPENSHIFT_MYSQL_DB_HOST || '127.0.0.1',
		port: process.env.OPENSHIFT_MYSQL_DB_PORT || 8889,
		user: process.env.OPENSHIFT_MYSQL_DB_USERNAME || 'root',
		password: process.env.OPENSHIFT_MYSQL_DB_PASSWORD || 'root',
		database: 'skywatch'
	});

// this is where we connect to the database
connection.connect();

module.exports = connection;