var gulp = require('gulp');
// Requires the gulp-sass plugin
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

// var useref = require('gulp-useref');
// var uglify = require('gulp-uglify');
// var gulpIf = require('gulp-if');
// var cssnano = require('gulp-cssnano');
var cache = require('gulp-cache');
var imagemin = require('gulp-imagemin');
// var del = require('del');
// var runSequence = require('run-sequence');

gulp.task('hello', function() {
  console.log('Hello Nam');
});
// biên dịch
gulp.task('sass',function(){
  // return gulp.src('app/scss/**/*.scss')
	return gulp.src('app/scss/app.scss')
	.pipe(sass())
	.pipe(gulp.dest('app/css'))
  .pipe(browserSync.reload({
      stream: true
    }))
});
// Live-reloading
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})

// watch + bien dich + live reload
gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']); 
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/*.html', browserSync.reload); 
  gulp.watch('app/js/**/*.js', browserSync.reload); 
});


// thực hiện nối các file js trong các folder khác nhau và minify: cần khai báo các file js trong header trong comment sau:
// <!--build:css css/styles.min.css-->
// <!--endbuild-->
// Làm tương tự  với các file css !!!

// gulp.task('useref', function(){
//   return gulp.src('app/*.html')
//     .pipe(useref())
//     // Minifies only if it's a JavaScript file
//     .pipe(gulpIf('*.js', uglify()))
//     // Minifies only if it's a CSS file
//     .pipe(gulpIf('*.css', cssnano()))
//     .pipe(gulp.dest('dist'))
// });

//copy font
// gulp.task('fonts', function() {
//   return gulp.src('app/fonts/**/*')
//   .pipe(gulp.dest('dist/fonts'))
// })

// tự động xóa các file đã tạo ra
// gulp.task('clean:dist', function() {
//   return del.sync('dist');
// })

// xóa cache
// gulp.task('cache:clear', function (callback) {
//     return cache.clearAll(callback)
// })

// Tối ưu hóa ảnh: gulp-imagemin
// cache plugin: gulp-cache
gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
});

// npm install run-sequence --save-dev
// gulp.task('build', function (callback) {
//   runSequence('clean:dist', 
//     ['sass', 'useref', 'images', 'fonts'],
//     callback
//   )
// })
// gulp.task('default', function (callback) {
//   runSequence(['sass','browserSync'], 'watch',
//     callback
//   )
// })
// gulp.task('minicss', function() {
//     return gulp.src('app/css/app.css')
//         .pipe(cssnano())
//         .pipe(gulp.dest('dist/css'));
// });