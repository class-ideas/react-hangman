var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var babel = require('babelify');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var notify  = require('gulp-notify');
var uglify = require('gulp-uglify');
var server  = require('gulp-server-livereload');
var fontAwesome = require('node-font-awesome');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var htmlhint = require('gulp-htmlhint');
var jscs = require('gulp-jscs');

var notifyError = function() {
  return plumber({
    errorHandler: notify.onError("Error: <%= error.message %>")
  });
}

var browserifyError = function(err) {
  notify.onError("Error: <%= error.message %>")(err);
  this.emit('end');
}


gulp.task('sass', function () {
  gulp.src('./sass/main.scss')
    .pipe( notifyError() )
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sass({
      includePaths: require('node-bourbon')
        .with(fontAwesome.scssPath)
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./app/css'));
});

gulp.task('fonts', function() {
  gulp.src(fontAwesome.fonts)
    .pipe( notifyError() )
    .pipe(gulp.dest('./app/fonts'));
});

gulp.task('normalize', function() {
  gulp.src(require.resolve('normalize.css'))
    .pipe( notifyError() )
    .pipe(gulp.dest('./app/css'));
});

gulp.task('browserify', function() {
  return browserify('./js/main.js', {debug: true})
    .transform(babel)
    .bundle()
    .on('error', browserifyError)
    .pipe(source('./main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    // .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./app/js'));
});

gulp.task('style:js', function() {
  return gulp.src('./js/**/*.js')
    .pipe(notifyError())
    .pipe(jscs())
    .pipe(jscs.reporter())
    .pipe(jscs.reporter('fail'))
});

gulp.task('hint:js', function() {
  return gulp.src('./js/**/*.js')
    .pipe(notifyError())
    .pipe(jshint({
      esnext: true, eqeqeq: true,
      linter: require('jshint-jsx').JSXHINT
    }))
    .pipe(jshint.reporter('fail'))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('hint:html', function() {
  return gulp.src('./app/index.html')
    .pipe(notifyError())
    .pipe(htmlhint())
    .pipe(htmlhint.failReporter());
});

gulp.task('lint', ['style:js', 'hint:js', 'hint:html']);

gulp.task('watch', function() {
  gulp.watch('./sass/*.scss', ['sass']);
  gulp.watch(['./js/*.js', './package.json'], ['browserify']);
  gulp.watch('./app/index.html', ['hint:html']);
  gulp.watch('./js/**/*.js', ['hint:js', ['style:js']]);
});

gulp.task('server', ['default'], function () {
  return gulp.src('app')
    .pipe(server({
      livereload: true
    }));
});

gulp.task('default', ['sass',
                      'fonts',
                      'normalize',
                      'lint',
                      'browserify']);

gulp.task('start', ['default', 'watch', 'server']);
