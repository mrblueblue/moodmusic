var root = 'client'; 
var path = require('path');
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var webpack = require('gulp-webpack');

var paths = {
  app: path.join(root, '**/**.js*'),
  entry: path.join(root, 'index.js'),
  output: path.join(__dirname, 'public')
};

gulp.task('build', ['webpack:build'])

gulp.task('webpack:build', function(callback){
  return gulp.src(paths.entry)
    .pipe(webpack(require('./webpack.config')))
    .pipe(gulp.dest(paths.output));
  callback();
});

gulp.task('lint', function(){
  return gulp.src(paths.app)
    .pipe(eslint({
      envs: {
        browser: true,
        es6: true
      },
      rules: {
        'quotes': [2, 'single', 'avoid-escape']
      }
    }))
    .pipe(eslint.format());
});

gulp.task('watch', function(){
  gulp.watch(paths.app, ['lint']);
});

gulp.task('default', ['build', 'lint', 'watch']);