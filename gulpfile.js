var gulp = require('gulp');

var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var imageminOptipng = require('imagemin-optipng');
var minifyCss = require('gulp-minify-css');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

// CSS
gulp.task('css', function() {
	gulp.src('assets/scss/tool.scss')
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(gulp.dest('./assets/css/'))
		.pipe(minifyCss())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./assets/css/'))
		.pipe(notify("CSS generated!"))
	;
});

// JS
gulp.task('js', function() {
	gulp.src('assets/js/src/**/*.js')
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./assets/js/dist/'))
		.pipe(notify("JS generated!"))
	;
});

// PNG
gulp.task('png', function() {
	gulp.src('assets/images/src/*.png')
		.pipe(imageminOptipng({optimizationLevel: 7})())
		.pipe(gulp.dest('./assets/images/dist/'))
		.pipe(notify("PNG generated!"))
	;
});

// Sync
gulp.task('sync', function() {
	browserSync.init({
		proxy: "splitview.se"
	});
	gulp.watch('**/*.php').on("change", browserSync.reload);
	gulp.watch('**/*.js').on("change", browserSync.reload);
});

// Default
gulp.task('default',function() {
	gulp.watch('assets/scss/**/*.scss',['css']);
	gulp.watch('assets/images/src/*.png',['png']);
	gulp.watch('assets/js/src/**/*.js',['js']);
});

//gulp concat
//uglifyjs
//svgmin