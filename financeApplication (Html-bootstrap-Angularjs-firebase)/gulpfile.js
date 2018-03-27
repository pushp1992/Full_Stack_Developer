var gulp = require('gulp');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var minifyImage = require('gulp-imagemin');
var cache = require('gulp-cache');

var JS_SOURCE = 'src/javascript';
var JS_DEST = 'dist/javascript';
var JS_OUTPUT_FILE = 'main.js';
var CSS_SOURCE = 'src/css';
var CSS_DEST = 'dist/css';
var SERVER_BASE_DIR = './';
var WATCH_FILE_EXTENSIONS = ['*.html'];

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: SERVER_BASE_DIR
    }
  });
});

gulp.task('bs-reload', function() {
  browserSync.reload();
});

gulp.task('javascript', function() {
  return gulp.src(JS_SOURCE + '/**/*.js')
    .pipe(plumber({
      errorHandler: function(error) {
        console.log(error.message);
        generator.emit('end');
    }}))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest(JS_DEST + '/'))
    .pipe(browserSync.reload({ stream:true }))
});

gulp.task('css', function() {
  gulp.src(CSS_SOURCE + '/**/*.scss')
    .pipe(plumber({
      errorHandler: function(error) {
        console.log(error.message);
        generator.emit('end');
    }}))
    .pipe(sass())
    .pipe(gulp.dest(CSS_DEST + '/'))
    .pipe(browserSync.reload({ stream:true }))
});

gulp.task('images', function() {
  gulp.src(IMAGE_SOURCE + '/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest(IMAGE_DEST + '/'));
});

gulp.task('default', ['browser-sync'], function() {
  gulp.watch(JS_SOURCE + '/**/*.js', ['javascript']);
  gulp.watch(CSS_SOURCE + '/**/*.scss', ['css']);
  gulp.watch(WATCH_FILE_EXTENSIONS, ['bs-reload']);
});
