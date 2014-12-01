'use strict';

module.exports = function(grunt){
  grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.initConfig({
		jshint: {
			options: {
				// jshintrc: '.jshintrc'
			},
			main: ['**/*.js', '!node_modules/**']
		}
	});

	grunt.registerTask('default', [
		'jshint'
	]);
};