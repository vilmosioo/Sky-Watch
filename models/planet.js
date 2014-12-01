'use strict';

var sequelize = require('./db'),
	DataTypes = require('sequelize'),
	Ephemerid = require('./ephemerid'),
	extend = require('extend'),
	julian = require('julian');

module.exports = sequelize.define('Planet', {
	'id': { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true, unique: true},
	'name': { type: DataTypes.TEXT, defaultValue: null}
}, {
	freezeTableName: true,
	timestamps: false,
	tableName: 'planet',
	classMethods: {
		get: function(args){
			var now = julian(new Date());
			return this.findAll(extend({
				include: [{
					model: Ephemerid,
					where: {
						JD: {
							between: [now - 1, now + 1] // retrieving ephemerids for +-1 day
						}
					}
				}]
			}, args));
		}
	}
});