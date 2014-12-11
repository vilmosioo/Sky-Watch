'use strict';

var Sequelize = require('sequelize');

module.exports = new Sequelize('skywatch', process.env.OPENSHIFT_MYSQL_DB_USERNAME || 'root', process.env.OPENSHIFT_MYSQL_DB_PASSWORD || 'root', {
	host: process.env.OPENSHIFT_MYSQL_DB_HOST || '127.0.0.1',
	port: process.env.OPENSHIFT_MYSQL_DB_PORT || 8889,
	define: {
		underscored: false,
		freezeTableName: true,
		syncOnAssociation: true,
		charset: 'utf8',
		collate: 'utf8_general_ci',
		timestamps: false
	}
});