'use strict';

var fs = require('fs'),
	path = require('path'),
	Sequelize = require('sequelize'),
	sequelize = require('./db');

var NGC = require('./ngc'),
	Name = require('./name'),
	Planet = require('./planet'),
	Ephemerid = require('./ephemerid');

NGC.hasMany(Name, {foreignKey: 'ngc'}); // This adds ngc foreign key to Name
Planet.hasMany(Ephemerid, {foreignKey: 'planet'}); // This adds planet foreign key to Ephemerid

module.exports = {
	NGC: NGC,
	Name: Name,
	Planet: Planet,
	Ephemerid: Ephemerid
};