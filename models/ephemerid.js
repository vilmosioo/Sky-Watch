'use strict';


var sequelize = require('./db'),
	DataTypes = require('sequelize');

module.exports = sequelize.define('Ephemerid', {
	'id': { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true, unique: true},
	'JD': { type: DataTypes.FLOAT, allowNull: false},
	'RAh': { type: DataTypes.INTEGER, allowNull: false},
	'RAm': { type: DataTypes.INTEGER, allowNull: false},
	'RAs': { type: DataTypes.FLOAT, allowNull: false},
	'DEd': { type: DataTypes.INTEGER, allowNull: false},
	'DEm': { type: DataTypes.INTEGER, allowNull: false},
	'DEs': { type: DataTypes.FLOAT, allowNull: false},
	'size': { type: DataTypes.FLOAT, allowNull: false},
	'magnitude': { type: DataTypes.FLOAT, allowNull: false},
	'constellation': { type: DataTypes.TEXT, allowNull: false}
}, {
	freezeTableName: true,
	timestamps: false,
	tableName: 'ephemerid'
});