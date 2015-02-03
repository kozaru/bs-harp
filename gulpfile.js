var gulp = require('gulp');
var copy = require('gulp-copy');
var prettify = require('gulp-html-prettify');
var imagemin = require('gulp-imagemin');
var newer = require('gulp-newer');
var runSequence = require('run-sequence');

var config = {
  'source': './www/**',
  'sourceHTML': './www/*.html',
  'sourceIMG': './www/images/**',
  'dist': './dist/',
  'distHTML': './dist/',
  'distIMG': './dist/images/',
  'bsLESS': './bower/bootstrap/less/**',
  'bsFONT': './bower/bootstrap/fonts/**',
  'bsJS': './bower/bootstrap/dist/js/bootstrap.js',
  'bsJSmin': './bower/bootstrap/dist/js/bootstrap.min.js',
  'bsJQUERY': './bower/jquery/dist/**',
  'publicLESS': './public/css/_bs/',
  'publicFONT': './public/fonts/',
  'publicJS': './public/js/'
}

gulp.task('bsless', function() {
  return gulp.src(config.bsLESS)
  .pipe(gulp.dest(config.publicLESS));
});

gulp.task('bsfonts', function() {
  return gulp.src(config.bsFONT)
  .pipe(gulp.dest(config.publicFONT));
});

gulp.task('bsjs', function() {
  return gulp.src(config.bsJS)
  .pipe(gulp.dest(config.publicJS));
});

gulp.task('bsjsmin', function() {
  return gulp.src(config.bsJSmin)
  .pipe(gulp.dest(config.publicJS));
});

gulp.task('bsjquery', function() {
  return gulp.src(config.bsJQUERY)
  .pipe(gulp.dest(config.publicJS));
});

gulp.task('bs', function() {
  runSequence(
    'bsless',
    'bsfonts',
    'bsjs',
    'bsjsmin',
    'bsjquery'
    );
});

gulp.task('copysource', function() {
  return gulp.src(config.source)
  .pipe(gulp.dest(config.dist));
});

gulp.task('copyimg', function() {
  return gulp.src(config.sourceIMG)
    .pipe(newer(config.distIMG))
    .pipe(imagemin({
      optimizationLevel: 3
    })) // See gulp-imagemin page.
    .pipe(gulp.dest(config.distIMG));
});

gulp.task('copy', function() {
  runSequence(
    'copysource',
    'copyimg'
    );
});

gulp.task('pretty', function() {
  return gulp.src(config.sourceHTML)
  .pipe(prettify({
    indent_char: ' ',
    indent_size: 2
  }))
  .pipe(gulp.dest(config.distHTML))
});

gulp.task('dist', function() {
  runSequence(
    'copy',
    'pretty'
    );
});

gulp.task('watch', function() {
  gulp.watch(config.sourceHTML, ['pretty']);
});

gulp.task('default', ['dist', 'watch']);
