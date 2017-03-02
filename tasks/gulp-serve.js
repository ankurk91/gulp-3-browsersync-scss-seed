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
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync').create();

  var paths = {
    src: {
      baseDir: './src',
      scss: './src/scss/**/*.scss',
      html: './src/**/*.html',
      js: './src/js/**/*.js',
      img: './src/img/**/*.{png,jpg,jpeg,gif,svg}'
    },
    tmp: {
      baseDir: './.tmp',
      css: './.tmp/css/**/*.css',
      html: './.tmp/**/*.html',
      js: './.tmp/js/**/*.js',
      img: './.tmp/img/**/*.{png,jpg,jpeg,gif,svg}'
    }
  };


  /**
   * If you want to make browserSync online run this command
   * gulp --online
   * @type {boolean}
   */
  var isOnline = (process.argv.slice(2)[1] == '--online');

  /**
   * Don't break on errors
   * @link https://github.com/floatdrop/gulp-plumber
   * @param err
   */
  var onError = function (err) {
    gutil.log(gutil.colors.red('Error: '), err.message);
    gutil.beep();
    this.emit('end');
  };

  /**
   * Gulp default task for browserSync
   * @ref http://www.browsersync.io/docs/options/
   * @more https://github.com/BrowserSync/recipes
   */
  gulp.task('default', ['serve:clean', 'serve:sass', 'serve:html', 'serve:scripts'], function () {
    browserSync.init({
      server: {
        baseDir: paths.tmp.baseDir,
        index: 'index.html',
        directory: true,
        routes: {
          //If you are using bower or npm
          '/bower_components': 'bower_components',
          '/node_modules': 'node_modules',
          //todo Where to place images ?
          '/img': 'src/img',

        }
      },
      files: [
        paths.tmp.css,
        paths.tmp.html,
        paths.tmp.js
      ],
      notify: false,
      online: isOnline,
      reloadOnRestart: true,
      logFileChanges: true,
      ghostMode: false
      // browser: ["google chrome", "firefox"]
    });

    //File watchers
    gulp.watch(paths.src.scss, ['serve:sass']);
    gulp.watch(paths.src.html, ['serve:html']);
    gulp.watch(paths.src.js, ['serve:scripts']);
  });


  /**
   * Compile sass into CSS & auto-prefix
   * @link https://www.browsersync.io/docs/gulp/#gulp-sass-css
   */
  gulp.task('serve:sass', function () {
    return gulp.src(paths.src.scss)
      .pipe(plumber({errorHandler: onError}))
      .pipe(sourcemaps.init())
      .pipe(sass({
          outputStyle: 'expanded', ////https://github.com/sass/node-sass#outputstyle
          precision: 10
        }
        )//.on('error', sass.logError)
      )
      .pipe(autoprefixer({
        browsers: ['last 4 versions', 'not IE <= 8', 'IE 9'],
        cascade: false,
        add: true,
        remove: true
      }))
      .pipe(rename('style.css'))
      .pipe(sourcemaps.write('./maps'))
      .pipe(gulp.dest(paths.tmp.baseDir + '/css/'))
      .pipe(browserSync.stream())
      .on('error', gutil.log);
  });


  /**
   *  Compile html files
   *  @link https://github.com/coderhaoxin/gulp-file-include
   */
  gulp.task('serve:html', function () {
    return gulp.src(paths.src.html)
      .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
      }))
      .pipe(gulp.dest(paths.tmp.baseDir))
      .pipe(browserSync.stream())
      .on('error', gutil.log);
  });

  //Combine scripts
  gulp.task('serve:scripts', function () {
    return gulp.src(paths.src.js)
      .pipe(concat('scripts.js'))
      .pipe(gulp.dest(paths.tmp.baseDir + '/js/'))
      .pipe(browserSync.stream())
      .on('error', gutil.log);
  });

  //Clean tmp folder
  gulp.task('serve:clean', function () {
    del.sync(paths.tmp.baseDir, {force: true})
  });

})();
