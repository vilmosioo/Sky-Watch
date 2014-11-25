'use strict';

var connection = require('./collection');

module.exports = {
	get: function(id, cb){
		this.find('id=' + id, cb);
	},
	find: function(where, cb){
		connection.query('SELECT * FROM `ngc` WHERE ' + where, function(err, rows, fields){
			cb(err, rows, fields);
		});
	}
};