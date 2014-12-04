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

var bootstrap = function(){
	return sequelize.sync({ force: true }).then(function(){
		// max_allowed_packet is too low, cannot use bulk create (low performance)
		// overwrite this variable before continuing
		return sequelize.query('SET @@global.max_allowed_packet = ' + (64 * 1024 * 1024)).then(function(s){
			var ngcs = require('../data/bootstrap/ngc');
			return Sequelize.Promise.all(NGC.bulkCreate(ngcs));
		});
	});
};

module.exports = {
	NGC: NGC,
	Name: Name,
	Planet: Planet,
	Ephemerid: Ephemerid,
	bootstrap: bootstrap
};