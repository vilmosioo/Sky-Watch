'use strict';

module.exports = function(sequelize, DataTypes) {
	var Planet = sequelize.define('Planet', {
		'id': { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true, unique: true},
		'name': { type: DataTypes.TEXT, defaultValue: null}
	}, {
		freezeTableName: true,
		timestamps: false,
		tableName: 'planet'
	});

	return Planet;
};