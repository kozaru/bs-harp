var gulp = require('gulp');
var copy = require('gulp-copy');
var prettify = require('gulp-html-prettify');
var runSequence = require('run-sequence');

var config = {
  'source': './public/www/**',
  'sourceHTML': './public/www/*.html',
  'dist': './dist/',
  'distHTML': './dist/',
  'bsLESS': './bower/bootstrap/less/**',
  'bsJS': './bower/bootstrap/dist/js/bootstrap.js',
  'bsJSmin': './bower/bootstrap/dist/js/bootstrap.min.js',
  'bsJQUERY': './bower/jquery/dist/**',
  'publicLESS': './public/css/_bs/',
  'publicJS': './public/js/'
}

gulp.task('bs', function() {
  gulp.src(config.bsLESS)
  .pipe(gulp.dest(config.publicLESS));
  gulp.src(config.bsJS)
  .pipe(gulp.dest(config.publicJS));
  gulp.src(config.bsJSmin)
  .pipe(gulp.dest(config.publicJS));
  gulp.src(config.bsJQUERY)
  .pipe(gulp.dest(config.publicJS));
});

gulp.task('copy', function() {
  return gulp.src(config.source)
  .pipe(gulp.dest(config.dist));
});

gulp.task('pretty', function() {
  return gulp.src(config.sourceHTML)
  .pipe(prettify({
    indent_char: ' ',
    indent_size: 2
  }))
  .pipe(gulp.dest(config.distHTML))
});

gulp.task('init', function() {
  runSequence(
    'copy',
    'pretty'
    );
});

gulp.task('watch', function() {
  gulp.watch(config.sourceHTML, ['pretty']);
});

gulp.task('default', ['init', 'watch']);
