(function () {
  'use strict';

  var gulp = require('gulp'),
    del = require('del'),
    gutil = require("gulp-util"),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require("gulp-rename"),
    fileinclude = require('gulp-file-include'),
    stripDebug = require('gulp-strip-debug'),
    csso = require('gulp-csso'),
    uglify = require("gulp-uglify"),
    processhtml = require('gulp-processhtml'),
    htmlhint = require("gulp-htmlhint"),
    stylelint = require('gulp-stylelint'),
    eslint = require('gulp-eslint'),
    concat = require('gulp-concat');

  var paths = {
    src: {
      baseDir: './src',
      scss: './src/scss/**/*.scss',
      html: './src/**/*.html',
      js: './src/js/**/*.js',
      img: './src/img/**/*.{ico,png,jpg,jpeg,gif,svg}',
      fonts: ["./src/fonts/*"],
      vendors: {
        scripts: [
          './node_modules/jquery/dist/jquery.min.js',
          './node_modules/bootstrap/dist/js/bootstrap.min.js'
        ],
        styles: [
          './node_modules/bootstrap/dist/css/bootstrap.min.css',
          './node_modules/font-awesome/css/font-awesome.min.css'
        ],
        fonts: [
          './node_modules/font-awesome/fonts/*.*',
          './node_modules/bootstrap/dist/fonts/*.*'
        ]
      }
    },
    dist: {
      baseDir: './dist',
      css: './dist/css/',
      js: './dist/js/',
      img: './dist/img/',
      fonts: './dist/fonts/'
    }
  };


  // Clean dist folder
  gulp.task('dist:clean', function () {
    del.sync(paths.dist.baseDir, {force: true})
  });

  //Custom java script
  gulp.task('dist:scripts.app', ['dist:clean'], function () {
    return gulp.src(paths.src.js)
      .pipe(stripDebug())
      .pipe(eslint({configFilePath: './.eslintrc.json'}))
      .pipe(eslint.format('stylish'))
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(concat('app.min.js'))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(paths.dist.js))
      .on('error', gutil.log);
  });

  // No need to minify vendor scripts
  gulp.task('dist:scripts.vendors', ['dist:clean'], function () {
    return gulp.src(paths.src.vendors.scripts)
      .pipe(concat('vendors.min.js'))
      .pipe(gulp.dest(paths.dist.js))
      .on('error', gutil.log);

  });

  /**
   * Compile scss
   * see options here https://github.com/sass/node-sass
   */
  gulp.task('dist:styles.app', ['dist:clean'], function () {
    return gulp.src(paths.src.scss)
      .pipe(stylelint({
        reporters: [
          {formatter: 'string', console: true}
        ]
      }))
      .pipe(sourcemaps.init())
      .pipe(sass({
          outputStyle: 'compressed',
          precision: 10
        }
        ).on('error', sass.logError)
      )
      .pipe(autoprefixer({
        browsers: ['last 4 versions', 'not IE <= 8', 'IE 9'],
        cascade: false,
        add: true,
        remove: true
      }))
      .pipe(csso())
      .pipe(rename('style.min.css'))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(paths.dist.css))
      .on('error', gutil.log);
  });

  // No need to minify vendor styles
  gulp.task('dist:styles.vendors', ['dist:clean'], function () {
    return gulp.src(paths.src.vendors.styles)
      .pipe(concat('vendors.min.css'))
      .pipe(gulp.dest(paths.dist.css))
      .on('error', gutil.log);
  });

  /**
   *  Compile html files
   *  @link https://github.com/coderhaoxin/gulp-file-include
   */
  gulp.task('dist:html', ['dist:clean'], function () {
    return gulp.src(paths.src.html)
      .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
      }))
      .pipe(processhtml())
      .pipe(htmlhint('./.htmlhintrc'))
      .pipe(htmlhint.failReporter())
      .pipe(gulp.dest(paths.dist.baseDir))
      .on('error', gutil.log);
  });

  //Copy fonts
  gulp.task('dist:fonts', ['dist:clean'], function () {
    return gulp.src(paths.src.vendors.fonts)
      .pipe(gulp.dest(paths.dist.fonts))
      .on('error', gutil.log);

  });

  //Copy images
  gulp.task('dist:images', ['dist:clean'], function () {
    return gulp.src(paths.src.img)
      .pipe(gulp.dest(paths.dist.img))
      .on('error', gutil.log);

  });

  gulp.task('dist', ['dist:clean', 'dist:scripts.app', 'dist:scripts.vendors', 'dist:html', 'dist:styles.app', 'dist:styles.vendors', 'dist:fonts', 'dist:images'], function (cb) {

    gutil.log('Dist: ', gutil.colors.white.bgGreen.bold('Finished dist task!'));

  });

})();
