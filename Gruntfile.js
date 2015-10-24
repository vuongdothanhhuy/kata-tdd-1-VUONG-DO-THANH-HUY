module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          clearRequireCache: true
        },
        src: ['test.js']
      },
    },
    jshint: {
      files: ['Gruntfile.js', 'index.js'],
      options: {
        jshintrc: true
      }
    },
    watch: {
      files: ['Gruntfile.js', 'index.js'],
      tasks: ['jshint', 'mochaTest']
    }
  });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);

};