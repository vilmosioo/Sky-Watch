'use strict';

module.exports = function(sequelize, DataTypes) {
	var NGC = sequelize.define('NGC', {
		'id': { type: DataTypes.INTEGER, allowNull: false},
		'RAh': { type: DataTypes.INTEGER, defaultValue: null, validate: { min: 0, max: 14}},
		'RAm': { type: DataTypes.FLOAT, defaultValue: null, validate: { min: 0, max: 60}},
		'DEd': { type: DataTypes.INTEGER, defaultValue: null, validate: { min: -90, max: 89}},
		'DEm': { type: DataTypes.FLOAT, defaultValue: null, validate: { min: 0, max: 60}},
		'type': { type: DataTypes.TEXT, defaultValue: null},
		'constelation': { type: DataTypes.TEXT, defaultValue: null},
		'magnitude': { type: DataTypes.FLOAT, defaultValue: null},
		'size_min': { type: DataTypes.FLOAT, defaultValue: null},
		'size_max': { type: DataTypes.FLOAT, defaultValue: null},
		'number_of_stars': { type: DataTypes.INTEGER, defaultValue: null},
		'class': { type: DataTypes.TEXT, defaultValue: null}
	}, {
		freezeTableName: true,
		timestamps: false,
		tableName: 'ngc'
	});

	return NGC;
};