//Main gulpfile
'use strict';

// Include tasks files
require('./tasks/gulp-serve.js');
require('./tasks/gulp-dist.js');

var gulp = require('gulp'),
  gutil = require("gulp-util");

//Default gulp task message
gulp.task('default', function () {
  gutil.log(gutil.colors.red('No default task'),
    gutil.colors.yellow.bold(
      '\nTop level tasks are:' +
      '\n ' + 'gulp serve ' +
      '\n ' + 'gulp dist'
    ), '\n' +
    'OR you can try "gulp --tasks" to list all tasks');
  process.exit(1);
});
