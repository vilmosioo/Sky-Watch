'use strict';

module.exports = function(sequelize, DataTypes) {
	var NGC = sequelize.define('NGC', {
		RAh: DataTypes.INTEGER,
		RAm: DataTypes.FLOAT,
		DEd: DataTypes.INTEGER,
		DEm: DataTypes.FLOAT,
		type: DataTypes.TEXT,
		constelation: DataTypes.TEXT,
		magnitude: DataTypes.FLOAT,
		size_min: DataTypes.FLOAT,
		size_max: DataTypes.FLOAT,
		number_of_stars: DataTypes.INTEGER,
		class: DataTypes.TEXT
	}, {
		classMethods: {
			associate: function(models) {
				NGC.hasMany(models.Names)
			}
		},
		freezeTableName: true,
		timestamps: false,
		tableName: 'ngc'
	});

	return NGC;
};