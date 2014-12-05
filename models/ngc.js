'use strict';

var sequelize = require('./db'),
	DataTypes = require('sequelize'),
	Name = require('./name'),
	extend = require('extend');

module.exports = sequelize.define('NGC', {
	'id': { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true, unique: true},
	'RAh': { type: DataTypes.INTEGER, defaultValue: null, validate: { min: 0, max: 14}},
	'RAm': { type: DataTypes.FLOAT, defaultValue: null, validate: { min: 0, max: 60}},
	'DEd': { type: DataTypes.INTEGER, defaultValue: null, validate: { min: -90, max: 89}},
	'DEm': { type: DataTypes.FLOAT, defaultValue: null, validate: { min: 0, max: 60}},
	'type': { type: DataTypes.TEXT, defaultValue: null},
	'constellation': { type: DataTypes.TEXT, defaultValue: null},
	'magnitude': { type: DataTypes.FLOAT, defaultValue: null},
	'size_min': { type: DataTypes.FLOAT, defaultValue: null},
	'size_max': { type: DataTypes.FLOAT, defaultValue: null},
	'number_of_stars': { type: DataTypes.INTEGER, defaultValue: null},
	'class': { type: DataTypes.TEXT, defaultValue: null}
}, {
	tableName: 'ngc',
	classMethods: {
		get: function(args){
			return this.findAll(extend({
				include: [{
					model: Name
				}]
			}, args))
				.then(function(ngcs){
					return ngcs.map(function(ngc){
						return ngc.values;
					});
				})
				.then(function(ngcs){
					return ngcs.map(function(ngc){
						delete ngc.id;
						ngc.Names = ngc.Names.map(function(name){
							return name.name;
						});
						return ngc;
					});
				});
		}
	}
});