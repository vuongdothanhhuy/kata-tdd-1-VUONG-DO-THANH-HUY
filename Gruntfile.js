module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'index.js'],
      options: {
        jshintrc: true
      }
    },
    watch: {
      files: ['Gruntfile.js', 'index.js'],
      tasks: ['jshint']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);

};