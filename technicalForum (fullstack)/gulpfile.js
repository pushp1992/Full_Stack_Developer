'use strict';
var gulp = require('gulp'),
  connect = require('gulp-connect');

var jsSources = ['app/*.js', 'app/**/*.js'],
  htmlSources = ['**/*.html', 'app/**/*.html'];

gulp.task('html', function() {
  gulp.src(htmlSources)
    .pipe(connect.reload());
});

gulp.task('js', function() {
  gulp.src(jsSources)
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch(jsSources, ['js']);
  gulp.watch(htmlSources, ['html']);
});

gulp.task('connect', function() {
  connect.server({
    root: '.',
    livereload: true
  });
});

gulp.task('default', ['html', 'js', 'connect', 'watch']);