module.exports = (grunt) ->
  fs = require('fs')

  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')

    open:
      default:
        url: 'http://localhost:8000/test/spec.html'

    connect:
      default:
        options:
          base: './'

    uglify:
      options:
        sourceMap: false
      lib:
        src: 'backbone.genetics.js'
        dest: 'backbone.genetics-min.js'

    jasmine:
      all:
        src: 'backbone.genetics.js'
        options:
          specs: 'test/spec/**/*.js'
          outfile: 'test/spec.html'
          vendor: ['http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js', 'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min.js', 'http://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min.js', 'http://cdnjs.cloudflare.com/ajax/libs/backbone.marionette/2.2.1/backbone.marionette.js', 'http://localhost:35729/livereload.js']

    coffee:
      all:
        files:
          'backbone.genetics.js': 'src/backbone.genetics.coffee'
      specs:
        files:
          grunt.file.expandMapping(['test/src/**/*.coffee'], 'test/spec/',
            rename: (destBase, destPath) ->
              return destBase + destPath.slice(9, destPath.length).replace(/\.coffee$/, '.js')
          )

    concurrent:
      compile: ['coffee']

    watch:
      coffee:
        files: ['src/**/*.coffee', 'test/src/**/*.coffee']
        tasks: ['uglify', 'coffee']
        options:
          livereload: true

  # Auto include Grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks)

  grunt.registerTask 'build', ['concurrent', 'uglify', 'jasmine:all:build']
  grunt.registerTask 'default', ['connect', 'build', 'open', 'watch']
  grunt.registerTask 'test', ['jasmine']
