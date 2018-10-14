var gulp  = require('gulp');
var sass  = require('gulp-sass');
var bSync = require('browser-sync');
var cache = require('gulp-cache');

gulp.task('sass', function(){
    gulp.src('./project/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./site/css'))
	.pipe(bSync.reload({stream:true}));
});

gulp.task('clear', function(callback){
	return cache.clearAll();
});

gulp.task('browser-sync', function(){
    bSync({
    	server: {
    	    baseDir: 'site'
    	},
    	notify: false
    });
});

gulp.task('watch', ['clear', 'browser-sync', 'sass'], function(){
    gulp.watch('./project/scss/**/*.scss', ['sass']);
    gulp.watch('./site/*.html', bSync.reload);
});

gulp.task('default', ['watch']);
