const gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifycss = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    htmlmin = require('gulp-htmlmin'),
    htmlclean = require('gulp-htmlclean'),
    imagemin = require('gulp-imagemin'),
    autoprefixer = require('gulp-autoprefixer'),
    child = require('child_process'),
    clean = require('gulp-clean'),
    del = require('del'),
    concat = require('gulp-concat'),
    banner = require('gulp-banner'),
    gs = require('gulp-selectors'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),

    browserSync = require('browser-sync').create(),
    pkg = require('./package.json');

const comment = '/*!\n' +
    ' * <%= pkg.name %> <%= pkg.version %>\n' +
    ' * <%= pkg.description %>\n' +
    ' * <%= pkg.homepage %>\n' +
    ' *\n' +
    ' * Copyright 2018, <%= pkg.author %>\n' +
    ' * Released under the <%= pkg.license %> license.\n' +
    '*/\n\n';

const baseJsFile = 'ui-kit.js';

let BUILD = false;

let getDistDir = function () {
    if (BUILD) {
        return './dist';
    }

    return './tmp';
};

gulp.task('clean', function () {
    return del('dist/**', {force:true});
});

gulp.task('clean:libs', function () {
    return del('libs/**', {force:true});
});

gulp.task('banner', function (fn) {
    fn();

    return true;
    return gulp.src('./dist/{js,css}/**/*')
        .pipe(banner(comment, {
            pkg: pkg
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('obfuscate', function () {
    const ignores = {
        ids: '*',
        classes: [
            'dropdown', 'dropdown-menu', 'dropdown-menu-right', 'dropdown-toggle', 'dropdown-item',
            'active', 'disabled', 'show',
            'list-group', 'list-group-item',
            'nav', 'nav-link', 'nav-item',
            'popover', 'popover-header', 'popover-body',
            'tooltip'
        ]
    };

    return gulp.src(['./dist/**/*.css', './dist/**/*.html'])
        .pipe(gs.run({
            'css': ['css'],
            'html': ['html']
        }, ignores))
        .pipe(gulp.dest('./dist'));
});

gulp.task('sass', function () {
    return gulp.src('./scss/**/*.scss')
        .pipe(sass({
            precision: 8,
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest(getDistDir() + '/css'));
});

gulp.task('js', function () {
    return gulp.src(['./js/vendor/*.js', './js/' + baseJsFile])
        .pipe(concat(baseJsFile))
        .pipe(gulp.dest(getDistDir() + '/js'));
});

gulp.task('minify-css', function () {
    return gulp.src('./dist/**/*.css')
        .pipe(minifycss({level: {1: {specialComments: 0}}}))
        .pipe(gulp.dest('./dist'));
});

gulp.task('minify-html', function () {
    return gulp.src('./dist/**/*.html')
        .pipe(htmlclean())
        .pipe(htmlmin({
            removeComments: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('fix-html', function () {
    return gulp.src('./dist/**/*.html')
        .pipe(replace('href="#"', 'href="javascript:void(0)"'))
        .pipe(replace(' class=""', ''))
        .pipe(replace(/^\s*[\r\n]/gm, ''))
        .pipe(gulp.dest('./dist'));
});

gulp.task('minify-js', function () {
    return gulp.src('./dist/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

gulp.task('babel-js', () =>
    gulp.src('./dist/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('dist'))
);

gulp.task('minify-img', function () {
    return gulp.src('./dist/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/img'));
});

gulp.task('copy-images', function () {
    return gulp.src('./img/**/*')
        .pipe(gulp.dest('./dist/img'));
});

gulp.task('copy-js', function (fn) {
    gulp.src('./js/**/*')
        .pipe(gulp.dest('./dist/js'));
    gulp.src('./libs/**/*')
        .pipe(gulp.dest('./dist/libs'));

    return fn();
});

gulp.task('jekyll', function (done) {
    let productionEnv = process.env;

    if (BUILD) {
        productionEnv.JEKYLL_ENV = 'production';
    }

    child.spawn('bundle', ['exec', 'jekyll', 'build', '--destination', getDistDir()], {stdio: 'inherit', env: productionEnv})
        .on('close', function () {
            done();
        });
});

// TODO: we need to improve it
// gulp.task('icon-sprite', function () {
// 	return gulp.src('icons/*.svg')
// 		.pipe(svgSprite({
// 			svgId: 'svg-%f',
// 			sprite: 'icons-sprite.svg',
// 			mode: 'symbol',
// 			preview: false
// 		}))
// 		.pipe(rename('icons-sprite.svg'))
// 		.pipe(gulp.dest('./pages/_includes'));
// });

gulp.task('copy', gulp.series(function (cb) {
    const scripts = {
        'bootstrap': 'bootstrap/dist/**/*.{js,min.js}',
        'apexcharts': 'apexcharts/dist/**/*.{js,min.js}',
        'jquery': 'jquery/dist/**/jquery.{js,min.js}',
        'peity': 'peity/jquery.peity.min.js',
        'jqvmap': 'jqvmap/dist/**/*.{js,css}',
        'selectize': 'selectize/dist/**/*.{js,css}',
    };

    for (let destinationDir in scripts) {
        gulp.src('./node_modules/' + scripts[destinationDir])
            .pipe(gulp.dest('./libs/' + destinationDir));
    }

    cb();
}));

gulp.task('useref', function () {
    return gulp.src('./dist/**/*.html')
        .pipe(useref({
            searchPath: ['./dist'],
            allowEmpty: true
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('serve', function () {
    browserSync.init({
        files: ['tmp/**'],
        port: 4567,
        watch: true,
        open: 'local',
        notify: false,
        server: {
            baseDir: 'tmp/',
            routes: {
                '/img': './img',
                '/libs': './libs',
                '/js': './js',
            }
        }
    });
});

gulp.task('watch', function () {
    gulp.watch('pages/**/*', gulp.series('jekyll'));
    gulp.watch('_config.yml', gulp.series('jekyll'));
    gulp.watch('scss/**/*', gulp.series('sass'));
    gulp.watch('js/**/*', gulp.series('js'));
    gulp.watch('libs/**/*', gulp.series('js'));
});

gulp.task('set-production', function (cb) {
    BUILD = true;
    cb();
});

gulp.task('compress', gulp.series(gulp.series('fix-html', /*'minify-html',*/ 'minify-css', /*'babel-js',*/ 'minify-js', 'minify-img'), 'banner'));
gulp.task('build', gulp.series('set-production', 'clean', 'jekyll', 'sass', 'copy-js', 'copy-images'/*, 'useref'*/, 'compress'));

gulp.task('default', gulp.series('sass', 'copy', /*'js',*/ 'jekyll', gulp.parallel('watch', 'serve')));
