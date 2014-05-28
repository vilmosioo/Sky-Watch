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
  // to do encrypt these variables
  grunt.initConfig({
    replace: {
      ftp: {
        options: {
          variables: {
            'ftp_user' : process.env.FTP_SERVER_USER || '',
            'ftp_pass': process.env.FTP_SERVER_PASSWORD || ''
          }
        },
        files: [
          {
            src: '.ftppass',
            dest: '.ftppass'
          }
        ]
      },
      db: {
        options: {
          variables: {
            'db_user' : process.env.DB_USER || '',
            'db_pass': process.env.DB_PASSWORD || ''
          }
        },
        files: [
          {
            src: 'application/configs/application.ini',
            dest: 'application/configs/application.ini'
          }
        ]
      }
    },
    'ftp-deploy': {
      build: {
        auth: {
          host: 'vilmosioo.co.uk',
          port: 21,
          authKey: 'key'
        },
        src: '.',
        dest: '/',
        exclusions: ['.ftppass', 'sftp-config.json', 'node_modules', 'tests', 'Gruntfile.js', 'package.json']
      }
    }
  });

  grunt.registerTask('build', [
    'replace',
    'ftp-deploy'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};
