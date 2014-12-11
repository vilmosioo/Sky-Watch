'use strict';

var sequelize = require('./db'),
	DataTypes = require('sequelize');

module.exports = sequelize.define('Name', {
	'id': { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true, unique: true},
	'ngc': { type: DataTypes.INTEGER },
	'name': { type: DataTypes.TEXT, allowNull: false}
}, {
	tableName: 'names'
});