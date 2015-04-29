var gulp = require('gulp');
var copy = require('gulp-copy');
var prettify = require('gulp-html-prettify');
var imagemin = require('gulp-imagemin');
var newer = require('gulp-newer');
var runSequence = require('run-sequence');
var csscomb = require('gulp-csscomb');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');

var config = {
  'source': './www/**',
  'sourceHTML': './www/*.html',
  'sourceCSS': './www/css/*.css',
  'sourceJS': './www/js/*.js',
  'sourceIMG': './www/images/**',
  'dist': './dist/',
  'distHTML': './dist/*.html',
  'distCSS': './dist/css/',
  'distJS': './dist/js/',
  'distIMG': './dist/images/',
  'bsLESS': './bower/bootstrap/less/**',
  'bsFONT': './bower/bootstrap/fonts/**',
  'bsJSmin': './bower/bootstrap/dist/js/bootstrap.min.js',
  'bsJQUERY': './bower/jquery/dist/jquery.min.js',
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
    'bsjsmin',
    'bsjquery'
    );
});

gulp.task('copysource', function() {
  return gulp.src(config.source)
  .pipe(gulp.dest(config.dist));
});

gulp.task('compresscss', function() {
  return gulp.src(config.sourceCSS)
    .pipe(csscomb())
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest(config.distCSS));
});

gulp.task('compressjs', function() {
  return gulp.src(config.sourceJS)
    .pipe(uglify())
    .pipe(gulp.dest(config.distJS));
});

gulp.task('copyimg', function() {
  return gulp.src(config.sourceIMG)
    .pipe(newer(config.distIMG))
    .pipe(imagemin({
      optimizationLevel: 3
    })) // See gulp-imagemin page.
    .pipe(gulp.dest(config.distIMG));
});

gulp.task('pretty', function() {
  return gulp.src(config.distHTML)
  .pipe(prettify({
    indent_char: ' ',
    indent_size: 2
  }))
  .pipe(gulp.dest(config.dist))
});

gulp.task('dist', function() {
  runSequence(
    'copysource',
    'compresscss',
    'compressjs',
    'copyimg',
    'pretty'
  );
});

gulp.task('watch', function() {
  gulp.watch(config.sourceHTML, ['pretty']);
});

gulp.task('default', ['dist', 'watch']);
