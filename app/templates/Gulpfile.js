/*
	Dutchwebworks Gulp boilerplate, may 2016
	https://github.com/dutchwebworks/gulp-boilerplate
*/

/**********************************************************************
1. Load all Gulp dependency NPM packages listed in `package.json`
**********************************************************************/

var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	$ = require('gulp-load-plugins')(),
	reload = browserSync.reload;

/**********************************************************************
2. Banner info prefixed to minified files (see `package.json`)
**********************************************************************/

// Generate pretty date for banner header in minified files
function formatDate() {
	var today = new Date(),
		month = today.getMonth() + 1,
		day = today.getDate();

	month = month > 9 ? month : "0" + month;
	day = day > 9 ? day : "0" + day;
	return (today.getFullYear() + '-' + month) + '-' + day;
}

// Meta-data and other vars
var pkg = require('./package.json'),
	projectRoot = './httpdocs',
	meta = {
		banner: ['/*!',
	  		' * Name: <%= pkg.name %>',
	  		' * Author: <%= pkg.author %>',
	  		' * Version: <%= pkg.version %>',
	  		' * Date: ' + formatDate(),
	  		' */',
	  		'',
	  	''].join('\n')
	};

/**********************************************************************
3. Configure Gulp tasks
**********************************************************************/

/* Sass compile with sourcemap
-------------------------------------------------------------------- */

gulp.task('sass:dev', function(){
	return gulp.src(projectRoot + '/sass/**/*.scss')
		.pipe($.newer(projectRoot + '/css'))
		.pipe($.sourcemaps.init())
		.pipe($.sass({
			style: 'extended',
			sourceComments: 'map',
			sourcemap: true,
			errLogToConsole: true
		}))
		.pipe($.sourcemaps.write('./'))
		.pipe(gulp.dest(projectRoot + '/css'));
});

gulp.task('sass:dist', function(){
	return gulp.src(projectRoot + '/sass/**/*.scss')
		.pipe($.newer(projectRoot + '/css'))
		.pipe($.sass({
			style: 'extended',
			sourcemap: false,
			errLogToConsole: true
		}))
		.pipe(gulp.dest(projectRoot + '/css'));
});

/* Concatenate and minify Css files
-------------------------------------------------------------------- */

gulp.task('cssmin', function(){
	return gulp.src([
			projectRoot + '/css/style.css'
		])
		.pipe($.concat('style.min.css'))
		.pipe($.minifyCss({
			keepBreaks: false,
			removeEmpty: true
		}))
		.pipe($.header(meta.banner, {
			pkg : pkg,
		 } ))
		.pipe(gulp.dest(projectRoot + '/css'));
});

/* Optimize JPG, PNG and GIF's
-------------------------------------------------------------------- */

gulp.task('imagemin', function(){
	return gulp.src(projectRoot + '/img/**/*.{png,jpg,gif}')
		.pipe($.imagemin({
			optimazationLevel: 5,
			progressive: false,
			interlaced: true
		}))
		.pipe(gulp.dest(projectRoot + '/img'));
});

/* Optimize SVG's
-------------------------------------------------------------------- */

gulp.task('svgmin', function(){
	return gulp.src(projectRoot + '/img/**/*.svg')
		.pipe($.svgmin())
		.pipe(gulp.dest(projectRoot + '/img'));
});

/* Jshint lint Javascript files
-------------------------------------------------------------------- */

gulp.task('jshint', function(){
	return gulp.src(projectRoot + '/js/*.js')
		.pipe($.jshint())
		.pipe($.jshint.reporter('default'));
});

/* Concatenate and uglify Javascript files
-------------------------------------------------------------------- */

gulp.task('uglify', function(){
	return gulp.src([
			projectRoot + '/js/libs/jquery-2.1.0.js',
			projectRoot + '/js/libs/modernizr-2.7.1.js',
			projectRoot + '/js/common.js'
		])
		.pipe($.concat('common.js', {
			newLine: ';'
		}))
		.pipe($.uglify())
		.pipe($.header(meta.banner, {
			pkg : pkg,
		 } ))
		.pipe(gulp.dest(projectRoot + '/js/min'));
});

/* Run a proxy server
-------------------------------------------------------------------- */

gulp.task('browser-sync', function() {
	browserSync({
		// proxy: { 'gulp-test.local.cassius.nl' }
		server: {
			baseDir: projectRoot
		}
	});
});

/* Cleanup the Sass generated --sourcemap *.map.css files
-------------------------------------------------------------------- */

gulp.task('clean', function(){
	gulp.src([
		projectRoot + '/css/**/*.map',
		projectRoot + '/js/**/*.map',
		],{read: false})
		.pipe($.clean());
});

/**********************************************************************
4. Registered Gulp tasks
**********************************************************************/

// Server (proxy) and file `watcher` livereload for local development
gulp.task('serve', ['browser-sync'], function(){
	gulp.watch(projectRoot + '/*.html', [reload]);
	gulp.watch(projectRoot + '/css/*.css', [reload]);
	gulp.watch(projectRoot + '/sass/**/*.scss', ['sass:dev', reload]);
});

// Aliasses, sub-tasks
gulp.task('build-sass', ['sass:dist'], function(){
	gulp.start('cssmin');
});
gulp.task('build-js', ['uglify']);
gulp.task('build-img', ['imagemin', 'svgmin']);

// Run once for deployment, build everything using above aliasses and run a cleanup task
gulp.task('default', ['build-sass', 'build-js', 'build-img'], function(){
	gulp.start('clean');
});
