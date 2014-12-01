'use strict';

var sequelize = require('./db'),
	DataTypes = require('sequelize');

module.exports = sequelize.define('Planet', {
	'id': { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true, unique: true},
	'name': { type: DataTypes.TEXT, defaultValue: null}
}, {
	freezeTableName: true,
	timestamps: false,
	tableName: 'planet'
});