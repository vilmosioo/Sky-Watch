'use strict';

var mysql = require('mysql'),

var DB = function(){
	this.connection = mysql.createConnection({
		host: process.env.OPENSHIFT_MYSQL_DB_HOST,
		port: process.env.OPENSHIFT_MYSQL_DB_PORT,
		user: process.env.OPENSHIFT_MYSQL_DB_USERNAME,
		password: process.env.OPENSHIFT_MYSQL_DB_PASSWORD,
		database: 'skywatch'
	});
	this.connection.connect();
};

var NGC = function(){};
NGC.prototype.get = function(id, cb){
	this.find('id=' + id, cb);
};
NGC.prototype.find = function(where, cb){
	this.connection.query('SELECT * FROM `ngc` WHERE ' + where, function(err, rows, fields){
		cb(err, rows, fields);
	});
};

DB.prototype.NGC = new NGC();

module.exports = new DB();