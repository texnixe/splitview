var gulp = require('gulp');

var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
<<<<<<< HEAD
var concat = require('gulp-concat');
=======
>>>>>>> origin/master
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
<<<<<<< HEAD
gulp.task('tool_js', function() {
	gulp.src('assets/js/src/tool/**/*.js')
		.pipe(concat('tool.js'))
		.pipe(gulp.dest('./assets/js/dist/'))
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./assets/js/dist/'))
		.pipe(notify("JS generated!"))
	;
});

// JS
gulp.task('site_js', function() {
	gulp.src('assets/js/src/site/**/*.js')
		.pipe(concat('site.js'))
		.pipe(gulp.dest('./assets/js/dist/'))
=======
gulp.task('js', function() {
	gulp.src('assets/js/src/**/*.js')
>>>>>>> origin/master
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
<<<<<<< HEAD
	gulp.watch('assets/js/src/tool/**/*.js',['tool_js']);
	gulp.watch('assets/js/src/site/**/*.js',['site_js']);
});
=======
	gulp.watch('assets/js/src/**/*.js',['js']);
});

//gulp concat
//uglifyjs
//svgmin
>>>>>>> origin/master
