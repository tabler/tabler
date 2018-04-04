var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    rtlcss = require('gulp-rtlcss'),
    pckg = require('./package.json');

gulp.task('styles', function () {
    return gulp.src('src/assets/scss/bundle.scss', { base: '.' })
        .pipe(sass({
            precision: 8,
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: pckg.browserslist,
            cascade: false
        }))
        .pipe(rename('dashboard.css'))
        .pipe(gulp.dest('src/assets/css/'))

        .pipe(rtlcss())
        .pipe(rename('dashboard.rtl.css'))
        .pipe(gulp.dest('src/assets/css/'));
});

gulp.task('styles-plugins', function () {
    return gulp.src('src/assets/plugins/**/plugin.scss', { base: '.' })
        .pipe(sass({
            precision: 6,
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: pckg.browserslist,
            cascade: false
        }))
        .pipe(rename(function(path) {
            path.extname = '.css';
        }))
        .pipe(gulp.dest('.'));
});

gulp.task('watch', ['styles', 'styles-plugins'], function() {
    gulp.watch('src/assets/scss/**/*.scss', ['styles']);
    gulp.watch('src/assets/plugins/**/*.scss', ['styles-plugins']);
});

gulp.task('build', ['styles', 'styles-plugins']);

gulp.task('default', ['build']);