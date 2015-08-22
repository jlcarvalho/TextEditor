/**
 * Created by JeanLucas on 22/08/2015.
 */
module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  var config = {
    dist: 'public/dist',
    tmp: '.tmp',
    src: 'public/src'
  };

  grunt.initConfig({
    useminPrepare: {
      html: config.tmp + '/*.html',
      options: {
        dest: config.dist
      }
    },

    usemin: {
      html: [config.tmp + '/*.html'],
      css: [config.tmp + '/css/*.css'],
      options: {
        assetsDirs: [config.dist + '/css']
      }
    },

    htmlmin: {
      dist: {
        files: [{
          expand: true,
          cwd: config.tmp,
          src: '*.html',
          dest: config.dist
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
          cwd: config.src,
          src: ['index.jade', 'error.jade'],
          dest: config.tmp,
          expand: true,
          ext: '.html'
        }]
      }
    },

    jshint: {
      all: [config.src + '/js/**/*.js']
    },

    copy: {
      styles: {
        expand: true,
        cwd: config.src + '/css',
        dest: config.tmp + '/css/',
        src: '{,*/}*.css'
      },
      scripts: {
        expand: true,
        cwd: config.src + '/js',
        dest: config.tmp + '/js/',
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
          cwd: config.tmp + '/css/',
          src: '{,*/}*.css',
          dest: config.dist + '/css/'
        }]
      }
    },

    watch: {
      css: {
        files: [config.src + '/css/**/*.css'],
        tasks: ['cssmin']
      },
      js: {
        files: [config.src + '/js/**/*.js'],
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
      dist: [config.dist],
      tmp: [config.tmp]
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
