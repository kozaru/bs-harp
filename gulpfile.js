var gulp = require('gulp');
var copy = require('gulp-copy');
var prettify = require('gulp-html-prettify');
var imagemin = require('gulp-imagemin');
var pngquant  = require('imagemin-pngquant');
var newer = require('gulp-newer');
var runSequence = require('run-sequence');
var csscomb = require('gulp-csscomb');
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var replace = require('gulp-replace');
var uglify = require('gulp-uglify');
var del = require('del');

var fs = require('fs');
var path = require('path');

var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

var AUTOPREFIXER_BROWSERS = [
  'ie >= 9',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4'
];

var config = {
  'relativePath': true,
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
  'distTemplates': 'dist/Templates/',
  'distLibrary': 'dist/Library/',
  'bsLESS': './node_modules/bootstrap/less/**',
  'bsFONT': './node_modules/bootstrap/fonts/**',
  'bsJSmin': './node_modules/bootstrap/dist/js/bootstrap.min.js',
  'bsJQUERY': './node_modules/jquery/dist/jquery.min.js',
  'publicLESS': './public/css/_bs/',
  'publicFONT': './public/fonts/',
  'publicJS': './public/js/'
}

// extract directory
var getFolders = function(dir) {
  return fs.readdirSync(dir)
    .filter(function(file) {
      return fs.statSync(path.join(dir, file)).isDirectory();
    });
}

function depth(pathList, addDir ,level) {
    var dirList = getFolders(addDir);
    for (var key in dirList){
      var nextDir = addDir + dirList[key] + "/";
      pathList.push(nextDir);
      pathList = depth(pathList,nextDir,level + 1);
    }
  return pathList;
}

var getPathList = function (defaultPath) {
  var pathList = [];
  pathList.push(defaultPath);
  pathList = depth(pathList,defaultPath,0);
  return pathList;
}

// Convert to relative path
var replacePath = function(base_path, target_path) {
  var tmp_str = '';
  base_path = base_path.split('/');
  base_path.pop();
  target_path = target_path.split('/');
  while (base_path[0] === target_path[0]) {
    base_path.shift();
    target_path.shift();
  }
  for (var i = 0; i < base_path.length; i++) {
    tmp_str += '../';
  }
  return tmp_str + target_path.join('/');
}

// Convert relative path in the dist directory
var changePath = function(pathItem){
  gulp.src(pathItem + '*.html')
    .pipe(replace(/src="\/(\S*)"/g, function($1) {
      var target_path = $1.replace('src="', '');
      target_path = target_path.replace('"', '');
      return 'src="' + replacePath('/' + pathItem.replace(config.dist, '') + '*.html', target_path) + '"';
    }))
    .pipe(replace(/href="\/(\S*)"/g, function($1) {
      var target_path = $1.replace('href="', '');
      target_path = target_path.replace('"', '');
      return 'href="' + replacePath('/' + pathItem.replace(config.dist, '') + '*.html', target_path) + '"';
    }))
    .pipe(gulp.dest(pathItem));
}

// Convert relative path with gulp task
gulp.task('changeRelativePath', function() {
  if(config.relativePath){
    var pathList = getPathList(config.dist);
    for (var i in pathList) {
      changePath(pathList[i]);
    }
  }
});

// browserSync
// use default task to launch Browsersync and watch files
gulp.task('server', function () {
  browserSync.init({
    proxy: 'localhost:9000'
  });
  // all browsers reload after tasks are complete.
  gulp.watch(['./public/**/*']).on('change', browserSync.reload);
});

// bootstrap
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
    .pipe(sourcemaps.init())
    .pipe(autoprefixer({
      browsers: AUTOPREFIXER_BROWSERS
    }))
    .pipe(cssnano())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.distCSS));
});

gulp.task('compressjs', function() {
  return gulp.src(config.sourceJS)
    .pipe(uglify())
    .pipe(gulp.dest(config.distJS));
});

gulp.task('copyimg', function() {
  return gulp.src(config.sourceIMG + '/{,**/}*.{png,jpg,gif}')
    .pipe(imagemin({
        progressive: true,
        use: [pngquant({quality: '65-80', speed: 1})]
    })) // See gulp-imagemin page.
    .pipe(gulp.dest(config.distIMG));
});

gulp.task('pretty', function() {
  var pathList = getPathList(config.dist);
  for (var key in pathList) {
    gulp.src(pathList[key] + '*.html')
      .pipe(prettify({
        indent_char: ' ',
        indent_size: 2
      }))
      .pipe(gulp.dest(pathList[key]));
  }
});

gulp.task('dist', function() {
  runSequence(
    'copysource',
    ['compresscss','compressjs','copyimg','pretty'],
    'changeRelativePath'
  );
});

gulp.task('watch', function() {
  gulp.watch(config.sourceHTML, ['pretty']);
});

gulp.task('default', ['dist', 'watch']);
