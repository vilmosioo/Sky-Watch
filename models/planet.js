'use strict';

var sequelize = require('./db'),
	DataTypes = require('sequelize'),
	Ephemerid = require('./ephemerid'),
	extend = require('extend'),
	linear = require('../scripts/linear'),
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
			// sequelize does not support order/limit clauses to include, it is not possible to retrive the current ephemeris
			// each planet will need to find it's ephemerid using a separate call
			// it's either this or a raw sql query
			return this.findAll(args)
				.then(function(planets){
					return sequelize.Promise.all(planets.map(function(planet){
						return planet.getEphemerids({
							limit: 2,
							order: [
								[sequelize.fn('ABS', '\'JD\ - ' + now), 'ASC']
							]
						}).then(function(ephemerids){
							return extend(linear({
								JD: now
							}, ephemerids), planet.values);
						});
					}));
				})
				.then(function(planets){
					return planets;
				});
		}
	}
});