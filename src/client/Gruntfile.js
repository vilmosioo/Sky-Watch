'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // configurable paths
  var yeomanConfig = {
    app: 'app',
    dist: 'dist'
  };

  try {
    yeomanConfig.app = require('./bower.json').appPath || yeomanConfig.app;
  } catch (e) {}

  grunt.initConfig({
    yeoman: yeomanConfig,
    manifest: {
      generate: {
        options: {
          basePath: 'dist/',
          preferOnline: true,
          verbose: false
        },
        src: [
          '**/*.*' // cache all files
        ],
        dest: 'dist/manifest.appcache'
      }
    },
    ngconstant: {
      dev: [{
        dest: 'app/scripts/config/constants.js',
        name: 'Constants',
        constants: {
          Constants: grunt.file.readJSON('app/scripts/config/constants.json')
        }
      }]
    },
    watch: {
      coffee: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.coffee'],
        tasks: ['coffee:dist']
      },
      coffeeTest: {
        files: ['test/spec/{,*/}*.coffee'],
        tasks: ['coffee:test']
      },
      compass: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass']
      },
      livereload: {
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
          '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ],
        tasks: ['livereload']
      }
    },
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, yeomanConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'test')
            ];
          }
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= connect.options.port %>'
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/{,*/}*.js',
        '!<%= yeoman.app %>/scripts/config/constants.js'
      ]
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },
    coffee: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/scripts',
          src: '{,*/}*.coffee',
          dest: '.tmp/scripts',
          ext: '.js'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: 'test/spec',
          src: '{,*/}*.coffee',
          dest: '.tmp/spec',
          ext: '.js'
        }]
      }
    },
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/styles',
        cssDir: '.tmp/styles',
        relativeAssets: true
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
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
			css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
			js: ['<%= yeoman.dist %>/scripts/{,*/}*.js'],
			options: {
				assetsDirs: ['<%= yeoman.dist %>', '<%= yeoman.dist %>/images', '<%= yeoman.dist %>/styles', '<%= yeoman.dist %>/styles/fonts'],
				patterns: {
					js: [
						[/(\/scripts\/main\.js)/g, 'Replacing reference to main.js'],
						[/(\/scripts\/controllers\/MainController\.js)/g, 'Replacing reference to MainController.js'],
						[/(\/scripts\/controllers\/SearchController\.js)/g, 'Replacing reference to SearchController.js'],
						[/(\/scripts\/controllers\/AboutController\.js)/g, 'Replacing reference to AboutController.js']
					]
				}
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= yeoman.dist %>/images'
        }]
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
          src: ['*.html', 'views/*.html', 'views/*/*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: ['app.js', 'main.js', 'controllers/*.js'],
          dest: '.tmp/concat/scripts'
        }]
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/**/*.js',
            '<%= yeoman.dist %>/**/*.css',
            '<%= yeoman.dist %>/**/*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= yeoman.dist %>/**/*.{eot,svg,ttf,woff}'
          ]
        }
      }
    },
		uglify: {
			options:{
				compress: false,
				beautify: true
			},
			main: {
				files: {
					'<%= yeoman.dist %>/scripts/main.js': [
						'.tmp/concat/scripts/main.js'
					]
				}
			},
			controllers: {
				files: {
					'<%= yeoman.dist %>/scripts/controllers/MainController.js': [
						'.tmp/concat/scripts/controllers/MainController.js'
					],
					'<%= yeoman.dist %>/scripts/controllers/SearchController.js': [
						'.tmp/concat/scripts/controllers/SearchController.js'
					],
					'<%= yeoman.dist %>/scripts/controllers/AboutController.js': [
						'.tmp/concat/scripts/controllers/AboutController.js'
					]
				}
			}
		},
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
      }
    },
		concat: {
			main: {
				files: {
					'.tmp/concat/scripts/main.js': [
						'<%= yeoman.app %>/scripts/config/config.js',
						'<%= yeoman.app %>/scripts/controllers/HeaderController.js',
						'<%= yeoman.app %>/scripts/directives/card.js',
						'<%= yeoman.app %>/scripts/directives/cards.js',
						'<%= yeoman.app %>/scripts/directives/menu.js',
						'<%= yeoman.app %>/scripts/directives/isloading.js',
						'<%= yeoman.app %>/scripts/services/converter.js',
						'<%= yeoman.app %>/scripts/services/localstorage.js',
						'<%= yeoman.app %>/scripts/services/modernizr.js',
						'<%= yeoman.app %>/scripts/services/time.js',
						'<%= yeoman.app %>/scripts/services/sky.js',
						'<%= yeoman.app %>/scripts/services/geo.js',
						'<%= yeoman.app %>/scripts/filters/degrees.js'
					]
				}
			},
			controllers: {
				files: {
					'.tmp/concat/scripts/controllers/MainController.js': [
						'<%= yeoman.app %>/scripts/controllers/MainController.js'
					],
					'.tmp/concat/scripts/controllers/SearchController.js': [
						'<%= yeoman.app %>/scripts/controllers/SearchController.js'
					],
					'.tmp/concat/scripts/controllers/AboutController.js': [
						'<%= yeoman.app %>/scripts/controllers/AboutController.js'
					]
				}
			}
		}
  });

  grunt.renameTask('regarde', 'watch');

  grunt.registerTask('server', [
    'clean:server',
    'ngconstant',
    'coffee:dist',
    'compass:server',
    'livereload-start',
    'connect:livereload',
    'open',
    'watch'
  ]);

  grunt.registerTask('test', [
    'clean:server',
    'coffee',
    'compass',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'ngconstant',
    'jshint',
    // 'test',
    'coffee',
    'compass:dist',
    'useminPrepare',
    'concat',
    'imagemin',
    'cssmin',
    'htmlmin',
    'copy',
		'ngmin',
		'cdnify',
		'uglify',
		'rev',
    'manifest',
    'usemin'
  ]);

  grunt.registerTask('default', ['build']);
};
