// Generated on 2014-02-22 using generator-angular 0.7.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

	// Load grunt tasks automatically
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	var pck = grunt.file.readJSON('./package.json');

	// Define the configuration for all the tasks
	grunt.initConfig({

		// Project settings
		yeoman: pck.config,
		pkg: pck,
		ngconstant: {
			dev: {
				options: {
					dest: pck.config.app + '/scripts/config/constants.js',
					name: 'Constants',
					constants: {
						Constants: grunt.file.readJSON(pck.config.app + '/scripts/config/constants.json')
					}
				}
			}
		},
		// Watches files for changes and runs tasks based on the changed files
		watch: {
			js: {
				files: '<%= jshint.all %>',
				tasks: ['jshint:all'],
				options: {
					livereload: true
				}
			},
			jsTest: {
				files: ['<%= yeoman.test %>/**/*.js'],
				tasks: ['jshint:test', 'karma']
			},
			constants: {
				files: ['<%= yeoman.app %>/scripts/config/**/*.json'],
				tasks: ['ngconstant']
			},
			compass: {
				files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
				tasks: ['compass:server']
			},
			express: {
				files:  [ 'server.js', 'models/**/*.js', 'routes/**/*.js', 'scripts/**/*.js', 'data/**/*.js'],
				tasks:  [ 'jshint:server', 'express:server' ],
				options: {
					spawn: false, // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
					livereload: true
				}
			},
			livereload: {
				options: {
					livereload: true
				},
				files: [
					'<%= yeoman.app %>/**/*.{html,js}',
					'<%= yeoman.tmp %> %>/styles/**/*.css',
					'<%= yeoman.app %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
				]
			}
		},

		// The actual grunt server settings
		connect: {
			test: {
				options: {
					port: 9001,
					base: [
						'<%= yeoman.tmp %>',
						'<%= yeoman.test %>',
						'<%= yeoman.app %>'
					]
				}
			}
		},

		// Make sure code styles are up to par and there are no obvious mistakes
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			all: {
				options: {
					jshintrc: '<%= yeoman.app %>/.jshintrc'
				},
				src: [
					'Gruntfile.js',
					'<%= yeoman.app %>/scripts/**/*.js',
					'!<%= yeoman.app %>/scripts/config/constants.js'
				]
			},
			test: {
				options: {
					jshintrc: '<%= yeoman.test %>/.jshintrc'
				},
				src: ['<%= yeoman.test %>/**/*.js']
			},
			server: {
				options: {
					jshintrc: '.jshintrc'
				},
				src: ['server.js', 'models/**/*.js', 'routes/**/*.js', 'scripts/**/*.js', 'data/**/*.js']
			}
		},

		// Empties folders to start fresh
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'<%= yeoman.tmp %>',
						'<%= yeoman.public %>',
						'<%= yeoman.dist %>/*',
						'!<%= yeoman.dist %>/.git*'
					]
				}]
			},
			server: '<%= yeoman.tmp %>'
		},
		// Compiles Sass to CSS and generates necessary files if requested
		compass: {
			options: {
				sassDir: '<%= yeoman.app %>/styles',
				cssDir: '<%= yeoman.tmp %>/styles',
				relativeAssets: true,
				importPath: '<%= yeoman.app %>/components/compass-twitter-bootstrap/stylesheets'
			},
			dist: {
				options: {
					outputStyle: 'compressed'
				}
			},
			server: {
				options: {
					debugInfo: true
				}
			}
		},
		// Renames files for browser caching purposes
		rev: {
			dist: {
				files: {
					src: [
						'<%= yeoman.dist %>/**/*.js',
						'<%= yeoman.dist %>/styles/**/*.css',
						'<%= yeoman.dist %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}',
						'<%= yeoman.dist %>/styles/fonts/*'
					]
				}
			}
		},

		// Reads HTML for usemin blocks to enable smart builds that automatically
		// concat, minify and revision files. Creates configurations in memory so
		// additional tasks can operate on them
		useminPrepare: {
			html: '<%= yeoman.app %>/index.html',
			options: {
				dest: '<%= yeoman.dist %>'
			}
		},

		// Performs rewrites based on rev and the useminPrepare configuration
		usemin: {
			html: ['<%= yeoman.dist %>/{,*/}*.html', '<%= yeoman.public %>/{,*/}*.html'],
			css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
			js: ['<%= yeoman.dist %>/scripts/{,*/}*.js'],
			options: {
				assetsDirs: ['<%= yeoman.dist %>', '<%= yeoman.dist %>/images', '<%= yeoman.dist %>/styles', '<%= yeoman.dist %>/styles/fonts'],
				patterns: {
					js: [
						[/(scripts\/controllers\/\w+\.js)/g, 'Replacing reference to controllers']
					]
				}
			}
		},
		htmlmin: {
			dist: {
				options: {
					removeCommentsFromCDATA: true,
					// https://github.com/yeoman/grunt-usemin/issues/44
					//  collapseWhitespace: true,
					collapseBooleanAttributes: true,
					removeAttributeQuotes: true,
					removeRedundantAttributes: true,
					useShortDoctype: true,
					removeEmptyAttributes: true,
					removeOptionalTags: true
				},
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>',
					src: ['views/*.html', 'views/*/*.html'],
					dest: '<%= yeoman.dist %>'
				}]
			},
			public: {
				options: {
					removeCommentsFromCDATA: true,
					// https://github.com/yeoman/grunt-usemin/issues/44
					//  collapseWhitespace: true,
					collapseBooleanAttributes: true,
					removeAttributeQuotes: true,
					removeRedundantAttributes: true,
					useShortDoctype: true,
					removeEmptyAttributes: true,
					removeOptionalTags: true
				},
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>',
					src: ['index.html'],
					dest: '<%= yeoman.public %>'
				}]
			}
		},
		// Allow the use of non-minsafe AngularJS files. Automatically makes it
		// minsafe compatible so Uglify does not destroy the ng references
		ngAnnotate: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.tmp %>/concat/scripts',
					src: ['*.js', 'controllers/*.js'],
					dest: '<%= yeoman.tmp %>/concat/scripts'
				}]
			}
		},

		// Copies remaining files to places other tasks can use
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= yeoman.app %>',
					dest: '<%= yeoman.dist %>',
					src: [
						'*.{ico,txt}',
						'.htaccess',
						'images/*.{png,jpg,jpeg,gif,webp,svg}',
						'styles/fonts/*.{eot,svg,ttf,woff}'
					]
				}]
			},
			image: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>/images',
					src: '{,*/}*.{png,jpg,jpeg,gif}',
					dest: '<%= yeoman.dist %>/images'
				}]
			}
		},

		// Run some tasks in parallel to speed up the build process
		concurrent: {
			server: [
				'compass:server'
			],
			test: [
				'compass'
			],
			dist: [
				'compass:dist'
			]
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
					'<%= grunt.template.today("yyyy-mm-dd") %> */'
			},
			controllers: {
				files: {
					'<%= yeoman.dist %>/scripts/controllers/BrowseController.js': [
						'<%= yeoman.tmp %>/concat/scripts/controllers/BrowseController.js'
					],
					'<%= yeoman.dist %>/scripts/controllers/MainController.js': [
						'<%= yeoman.tmp %>/concat/scripts/controllers/MainController.js'
					],
					'<%= yeoman.dist %>/scripts/controllers/SearchController.js': [
						'<%= yeoman.tmp %>/concat/scripts/controllers/SearchController.js'
					],
					'<%= yeoman.dist %>/scripts/controllers/AboutController.js': [
						'<%= yeoman.tmp %>/concat/scripts/controllers/AboutController.js'
					]
				}
			}
		},
		concat: {
			controllers: {
				files: {
					'<%= yeoman.tmp %>/concat/scripts/controllers/BrowseController.js': [
						'<%= yeoman.app %>/scripts/controllers/BrowseController.js'
					],
					'<%= yeoman.tmp %>/concat/scripts/controllers/MainController.js': [
						'<%= yeoman.app %>/scripts/controllers/MainController.js'
					],
					'<%= yeoman.tmp %>/concat/scripts/controllers/SearchController.js': [
						'<%= yeoman.app %>/scripts/controllers/SearchController.js'
					],
					'<%= yeoman.tmp %>/concat/scripts/controllers/AboutController.js': [
						'<%= yeoman.app %>/scripts/controllers/AboutController.js'
					]
				}
			}
		},
		// Test settings
		karma: {
			unit: {
				configFile: 'karma.conf.js'
			}
		},
		protractor: {
			options: {
				configFile: 'protractor.conf.js',
				keepAlive: false
			},
			test: {},
		},
		shell: {
			test: {
				options: {
					stdout: true
				},
				command: 'node node_modules/protractor/bin/webdriver-manager update'
			}
		},
		replace: {
			dist: {
				options: {
					variables: {
						'version' : '<%= pkg.version %>'
					}
				},
				files: [
					{
						expand: true,
						dot: true,
						cwd: '<%= yeoman.dist %>',
						dest: '<%= yeoman.dist %>',
						src: [
							'**/*'
						]
					}
				]
			}
		},
		angular_template_inline_js: {
			dist:{
				options: {
					basePath: '<%= yeoman.dist %>'
				},
				files: [{
					cwd: '<%= yeoman.dist %>',
					expand: true,
					src: ['**/*.app.js'],
					dest: '<%= yeoman.dist %>'
				}]
			}
		},
		express: {
			options: {
				script: 'server.js',
				output: 'Server listening .+'
			},
			server: {
				options:{
					node_env: 'development'
				}
			},
			dist: {
				options: {
					node_env: 'production',
					background: false
				}
			}
		},
		compress: {
			build: {
				options: {
					archive: 'sky-watch.zip'
				},
				files: [
					{
						expand: true,
						cwd: 'dist/',
						src: ['**/*'],
						dest: '.'
					}
				]
			}
		},
		'github-release': {
			dist: {
				options: {
					repository: 'vilmosioo/Sky-Watch', // Path to repository
					auth: {   // Auth credentials
						user: 'vilmosioo',
						password: process.env.GITHUB_TOKEN
					}
				},
				files: {
					src: [
						'sky-watch.zip',
						'sky-watch.apk'
					]
				}
			}
		},
		rename: {
			dist: {
				files: [
					{
						src: 'platforms/android/build/outputs/apk/android-debug.apk',
						dest: 'sky-watch.apk'
					}
				]
			}
		},
		ts: {
			dev : {
				src: '<%= yeoman.app %>/**/*.js',
				dest: '<%= yeoman.dist %>'
			}
		}
	});

	grunt.registerTask('server', [
		'express:server',
		'clean:server',
		'ngconstant',
		'concurrent:server',
		'watch'
	]);

	grunt.registerTask('dist', [
		'build',
		'express:dist'
	]);

	grunt.registerTask('release', [
		'rename',
		'github-release'
	]);

	grunt.registerTask('ptor', function () {
		grunt.task.run(['shell', 'protractor']);
	});

	grunt.registerTask('test', [
		'jshint',
		'clean:server',
		'ngconstant',
		'concurrent:test',
		'connect:test',
		'karma',
		//'ptor'
	]);

	grunt.registerTask('build', [
		'clean:dist',
		'useminPrepare',
		'concurrent:dist',
		'concat',
		'cssmin',
		'htmlmin',
		'copy',
		'ngAnnotate',
		'uglify',
		'rev',
		'usemin',
		'replace:dist',
		'angular_template_inline_js',
		'compress'
	]);

	grunt.registerTask('default', [
		'test',
		'build'
	]);
};
