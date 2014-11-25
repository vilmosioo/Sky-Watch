'use strict';

var connection = require('./collection');

module.exports = {
	get: function(id, cb){
		if(!id){
			cb({
				message: 'An id is required'
			});
			return;
		}
		connection.query('SELECT * FROM `ngc` WHERE id=' + id, function(err, rows, fields){
			cb(err, rows, fields);
		});
	},
	all: function(options, cb){
		// options should be sanitised by now
		var query = 'SELECT * FROM `ngc`';
		query += ' ORDER BY ' + options.orderby.map(function(field){
			return field + ' ' + options.desc;
		}).join(', ');
		query += ' LIMIT ' + options.limit;
		query += ' OFFSET ' + options.offset;

		connection.query(query, function(err, rows, fields){
			cb(err, rows, fields);
		});
	}
};