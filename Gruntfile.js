/**
 * Created by JeanLucas on 22/08/2015.
 */
module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    useminPrepare: {
      html: '.tmp/*.html',
      options: {
        dest: 'public/dist'
      }
    },

    usemin: {
      html: ['.tmp/*.html'],
      css: ['.tmp/css/*.css'],
      options: {
        assetsDirs: ['public/dist/css']
      }
    },

    htmlmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp',
          src: '*.html',
          dest: 'public/dist'
        }]
      }
    },

    uglify: {
      dist: {}
    },

    jade: {
      options: {
        pretty: true
      },
      compile: {
        files: [{
          cwd: "public/src",
          src: ["index.jade", "error.jade"],
          dest: ".tmp",
          expand: true,
          ext: ".html"
        }]
      }
    },

    jshint: {
      all: ['public/src/js/**/*.js']
    },

    copy: {
      styles: {
        expand: true,
        cwd: 'public/src/css',
        dest: '.tmp/css/',
        src: '{,*/}*.css'
      },
      scripts: {
        expand: true,
        cwd: 'public/src/js',
        dest: '.tmp/js/',
        src: '{,*/}*.js'
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 5 version', 'ie 8', 'ie 9']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/css/',
          src: '{,*/}*.css',
          dest: 'public/dist/css/'
        }]
      }
    },

    watch: {
      css: {
        files: ['public/src/css/**/*.css'],
        tasks: ['cssmin']
      },
      js: {
        files: ['public/src/js/**/*.js'],
        tasks: ['jshint', 'uglify']
      }
    },

    nodemon: {
      dev: {
        script: 'bin/www'
      }
    },

    concurrent: {
      watch: {
        options: {
          logConcurrentOutput: true
        },
        tasks: ['nodemon', 'watch']
      },
      dist: [
        'copy:styles',
        'copy:scripts'
      ]
    },

    clean: {
      dist: ['public/dist'],
      tmp: ['.tmp']
    }
  });

  grunt.registerTask('serve', ['concurrent:watch']);
  grunt.registerTask('dist', [
    'clean:dist',
    'jshint',
    'jade',
    'useminPrepare',
    'autoprefixer',
    'concurrent:dist',
    'concat',
    'cssmin',
    'uglify',
    'usemin',
    'htmlmin',
    'clean:tmp'
  ]);
};
