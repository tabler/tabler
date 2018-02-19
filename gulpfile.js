var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
	gs = require('gulp-selectors'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('styles', function () {
    return gulp.src('assets/scss/bundle.scss', { base: '.' })
        .pipe(sass({
            precision: 8,
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['>1%'],
            cascade: false
        }))
        .pipe(rename('dashboard.css'))
        .pipe(gulp.dest('assets/css/'));
});

gulp.task('styles-plugins', function () {
    return gulp.src('assets/plugins/**/plugin.scss', { base: '.' })
        .pipe(sass({
            precision: 6,
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['>1%'],
            cascade: false
        }))
        .pipe(rename(function(path) {
            path.extname = '.css';
        }))
        .pipe(gulp.dest('.'))
        .pipe(rename(function(path) {
            path.extname = '.min.css';
        }))
        .pipe(gulp.dest('.'));
});

gulp.task('watch', ['styles', 'styles-plugins'], function() {
    gulp.watch('assets/scss/**/*.scss', ['styles']);
    gulp.watch('assets/plugins/**/*.scss', ['styles-plugins']);
});

gulp.task('default', ['styles', 'styles-plugins']);