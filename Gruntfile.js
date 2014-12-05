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

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: {
      // configurable paths
      app: require('./bower.json').appPath || 'client',
      dist: 'dist'
    },
    pkg: grunt.file.readJSON('./package.json'),
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
        dest: '<%= yeoman.app %>/scripts/config/constants.js',
        name: 'Constants',
        constants: {
          Constants: grunt.file.readJSON('app/scripts/config/constants.json')
        }
      }]
    },
    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: ['<%= yeoman.app %>/scripts/**/*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: true
        }
      },
      jsTest: {
        files: ['test/**/*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      compass: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass:server']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%= yeoman.app %>'
          ]
        }
      },
      test: {
        options: {
          port: 9001,
          base: [
            '.tmp',
            'test',
            '<%= yeoman.app %>'
          ]
        }
      },
      dist: {
        options: {
          base: '<%= yeoman.dist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/**/*.js',
        '!<%= yeoman.app %>/scripts/config/constants.js'
      ],
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/**/*.js']
      }
    },

    // Empties folders to start fresh
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
    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/styles',
        cssDir: '.tmp/styles',
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
            '<%= yeoman.dist %>/scripts/**/*.js',
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
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
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

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
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
    // Allow the use of non-minsafe AngularJS files. Automatically makes it
    // minsafe compatible so Uglify does not destroy the ng references
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: ['app.js', 'controllers/*.js'],
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
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
        'compass:dist',
        'imagemin'
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
            '.tmp/concat/scripts/controllers/BrowseController.js'
          ],
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
    concat: {
      controllers: {
        files: {
          '.tmp/concat/scripts/controllers/BrowseController.js': [
            '<%= yeoman.app %>/scripts/controllers/BrowseController.js'
          ],
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
      ftp: {
        options: {
          variables: {
            'ftp_user' : process.env.DEPLOY_USER || '',
            'ftp_pass': process.env.DEPLOY_PASSWORD || ''
          }
        },
        files: [
          {
            src: '.ftppass',
            dest: '.ftppass'
          }
        ]
      },
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
    'ftp-deploy': {
      build: {
        auth: {
          host: 'ftp.vilmosioo.co.uk',
          port: 21,
          authKey: 'key'
        },
        src: '<%= yeoman.dist %>',
        dest: '/',
        exclusions: []
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
    }
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'ngconstant',
      'concurrent:server',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });

  grunt.registerTask('ptor', function () {
    grunt.task.run(['shell', 'protractor']);
  });

  grunt.registerTask('test', [
    'clean:server',
    'ngconstant',
    'concurrent:test',
    'connect:test',
    'karma',
    //'ptor'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'jshint',
    'test',
    'useminPrepare',
    'concurrent:dist',
    'concat',
    'imagemin',
    'cssmin',
    'htmlmin',
    'copy',
    'ngmin',
    'cdnify',
    'uglify',
    'rev',
    'usemin',
    'replace:dist',
    'angular_template_inline_js',
    'manifest'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};