'use strict';

var sequelize = require('./db'),
	DataTypes = require('sequelize'),
	Ephemerid = require('./ephemerid'),
	extend = require('extend'),
	julian = require('julian');

// function to compute the linear extrapolation of certain fields from two ephemerids
var linear = function(obj, obj1, obj2){
	var JD = obj.JD;
	delete obj.JD;

	return Object.keys(obj).reduce(function(obj, field){
		obj[field] = obj1[field] + (obj1[field] - obj2[field]) / (obj1.JD - obj2.JD) * (JD - obj1.JD);
		return obj;
	}, obj);
};

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
								[sequelize.fn('ABS', sequelize.condition(sequelize.col('JD'), '-', now)), 'ASC']
							]
						})
						.then(function(ephemerids){
							return ephemerids.map(function(ephemerid){
								return ephemerid.values;
							});
						})
						.then(function(ephemerids){
							return extend({
								constellation: ephemerids[0].constellation
							}, linear({
								JD: now,
								magnitude: 99,
								RAh: 0,
								RAm: 0,
								RAs: 0,
								DEd: 0,
								DEm: 0,
								DEs: 0,
								size: 0
							}, ephemerids[0], ephemerids[1]), planet.values);
						});
					}));
				})
				.then(function(planets){
					return planets;
				});
		}
	}
});