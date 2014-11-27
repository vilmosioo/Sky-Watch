'use strict';

module.exports = function(sequelize, DataTypes) {
	var Name = sequelize.define("Name", {
		'id': { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true, unique: true},
		'ngc': { type: DataTypes.INTEGER },
		'name': { type: DataTypes.TEXT, allowNull: false}
	}, {
		freezeTableName: true,
		timestamps: false,
		tableName: 'names'
	});

	return Name;
};