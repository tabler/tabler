const gulp = require('gulp'),
	clean = require('gulp-clean'),
	sass = require('gulp-sass'),
	postcss = require('gulp-postcss'),
	cleanCSS = require('gulp-clean-css'),
	rename = require('gulp-rename'),
	browserSync = require('browser-sync'),
	glob = require('glob'),
	fs = require('fs'),
	path = require('path'),
	YAML = require('yaml'),
	tildeImporter = require('node-sass-tilde-importer'),
	cp = require('child_process');


let BUILD = false,
	distDir = './dist',
	demoDir = './demo',
	srcDir = './src';

gulp.task('build-on', function (cb) {
	BUILD = true;

	cb();
});

gulp.task('svg-icons', function (cb) {
	const prepareSvgFile = function (svg) {
		return svg.replace(/\n/g, '').replace(/>\s+</g, '><');
	};

	const generateIconsYml = function (dir, filename) {
		const files = glob.sync(dir);
		let svgList = {};

		files.forEach(function (file) {
			const basename = path.basename(file, '.svg');
			svgList[basename] = prepareSvgFile(fs.readFileSync(file).toString());
		});

		fs.writeFileSync(filename, YAML.stringify(svgList));
	};

	generateIconsYml("./node_modules/tabler-icons/icons/*.svg", `${srcDir}/pages/_data/icons-tabler.yml`);
	generateIconsYml(`${srcDir}/svg/brand/*.svg`, `${srcDir}/pages/_data/icons-brand.yml`);

	cb();
});

gulp.task('unused-files', function(cb) {
	let foundFiles = [];

	glob.sync(`${srcDir}/pages/**/*.{html,md}`).forEach(function (file) {
		let fileContent = fs.readFileSync(file);

		fileContent.toString().replace(/\{% include(_cached)? ([a-z0-9\/_-]+\.html)/g, function (f, c, filename) {
			filename = `${srcDir}/pages/_includes/${filename}`;

			if (!foundFiles.includes(filename)) {
				foundFiles.push(filename);
			}
		});
	});

	let includeFiles = glob.sync(`${srcDir}/pages/_includes/**/*.html`);

	includeFiles.forEach(function (file) {
		if (!foundFiles.includes(file)) {
			console.log('file', file);
		}
	});

	cb();
});

/**
 * Clean `dist` folder
 */
gulp.task('clean', function () {
	return gulp
		.src(`{${distDir}/*,${demoDir}/*}`, { read: false })
		.pipe(clean());
});

/**
 * Compile sass to css
 */
gulp.task('sass', function () {
	const g = gulp
		.src(`${srcDir}/scss/*.scss`)
		.pipe(sass({
			style: 'expanded',
			importer: (url, prev, done) => {
				if (url[0] === '~') {
					url = path.resolve('node_modules', url.substr(1));
				}

				return { file: url };
			},
		}).on('error', sass.logError))
		.pipe(postcss([
			require('autoprefixer'),
		]))
		.pipe(gulp.dest(`${distDir}/css/`))
		.pipe(browserSync.reload({
			stream: true,
		}));

	if (BUILD) {
		g.pipe(cleanCSS())
			.pipe(rename(function (path) {
				path.basename += '.min';
			}))
			.pipe(gulp.dest(`${distDir}/css/`));
	}

	return g;
});

gulp.task('js', function cb() {
	cb();
});

gulp.task('watch-jekyll', function(cb) {
	browserSync.notify('Building Jekyll');
	return cp.spawn('bundle', ['exec', 'jekyll', 'build', '--watch', '--destination', demoDir], { stdio: 'inherit' })
		.on('close', cb);
});

gulp.task('build-jekyll', function(cb) {
	return cp.spawn('bundle', ['exec', 'jekyll', 'build', '--destination', demoDir], { stdio: 'inherit' })
		.on('close', cb);
});

gulp.task('watch', function(cb) {
	gulp.watch('./src/scss/**/*.scss', gulp.series('sass'));
	gulp.watch('./src/js/**/*.js', gulp.series('js'));
	cb();
});

gulp.task('browser-sync', function() {
	browserSync({
		watch: true,
		server: {
			baseDir: demoDir,
			routes: {
				'/node_modules': 'node_modules',
				'/dist/css': `${distDir}/css`,
				'/dist/js': `${distDir}/js`,
				'/dist/img': `${srcDir}/img`,
				'/static': `${srcDir}/static`,
			},
		},
		port: 3000,
		open: false,
		host: 'localhost',
		notify: false,
		reloadOnRestart: true
	});
});

gulp.task('copy-images', function() {
	return gulp
		.src(`${srcDir}/img/**/*`)
		.pipe(gulp.dest(`${distDir}/img`));
});

gulp.task('copy-static', function() {
	return gulp
		.src(`${srcDir}/static/**/*`)
		.pipe(gulp.dest(`${demoDir}/static`));
});

gulp.task('copy-dist', function() {
	return gulp
		.src(`${distDir}/**/*`)
		.pipe(gulp.dest(`${demoDir}/dist/`));
});

gulp.task('start', gulp.series('clean', 'sass', 'build-jekyll', /*'js',*/ gulp.parallel('watch-jekyll', 'watch', 'browser-sync')));

gulp.task('prepare-demo', gulp.series('build-jekyll', 'copy-static', 'copy-dist'));

gulp.task('build', gulp.series('build-on', 'clean', 'sass'/*, 'js'*/, 'copy-images', 'prepare-demo'));
