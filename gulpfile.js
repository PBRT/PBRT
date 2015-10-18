var del = require('del');
var gulp = require('gulp');
// var colors = require('colors');
var gutil = require('gulp-util');
var webpack = require('webpack');
var $ = require('gulp-load-plugins')();
var config = require('./webpack.config.js');


// Build app
gulp.task('webpack', ['clean'], function(callback) {
  // run webpack
  webpack(config, function(err, stats) {
    if (err) { throw new $.util.PluginError('Webpack Error:', err); }
    gutil.log('[webpack]', stats.toString({colors: true}));
    callback();
  });
});

gulp.task('copy:server', ['clean'], function() {
  gulp.src([
    'server/**',
  ]).pipe(gulp.dest('dist/server'));
});

gulp.task('copy:package-json', ['clean'], function() {
  gulp.src([
    'package.json',
  ]).pipe(gulp.dest('dist/'));
});

gulp.task('clean', function() {
  return del(['dist/**']);
});

gulp.task('build', [
  'copy:server',
  'copy:package-json',
  'webpack',
]);
