'use strict';

module.exports = function(sequelize, DataTypes) {
	var Name = sequelize.define("Name", {
		title: DataTypes.STRING
	}, {
		classMethods: {
			associate: function(models) {
				Name.belongsTo(models.NGC);
			}
		},
		freezeTableName: true,
		timestamps: false,
		tableName: 'names'
	});

	return Name;
};