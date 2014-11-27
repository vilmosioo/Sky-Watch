'use strict';

var fs = require('fs'),
	path = require('path'),
	Sequelize = require('sequelize');

var sequelize = new Sequelize('skywatch', process.env.OPENSHIFT_MYSQL_DB_USERNAME || 'root', process.env.OPENSHIFT_MYSQL_DB_PASSWORD || 'root', {
	host: process.env.OPENSHIFT_MYSQL_DB_HOST || '127.0.0.1',
	port: process.env.OPENSHIFT_MYSQL_DB_PORT || 8889
});


module.exports = {
	NGC: sequelize.import(path.join(__dirname, 'ngc.js')),
	Name: sequelize.import(path.join(__dirname, 'name.js'))
};