const gulp = require('gulp'),
	clean = require('gulp-clean'),
	glob = require('glob'),
	fs = require('fs'),
	path = require('path'),
	YAML = require('yaml'),
	cp = require('child_process');


gulp.task('svg-icons', function (cb) {
	const prepareSvgFile = function(svg) {
		return svg.replace(/\n/g, '').replace(/>\s+</g, '><');
	};

	const generateIconsYml = function(dir, filename) {
		const files = glob.sync(dir);
		let svgList = {};

		files.forEach(function(file){
			const basename = path.basename(file, '.svg');
			svgList[basename] = prepareSvgFile(fs.readFileSync(file).toString());
		});

		fs.writeFileSync(filename, YAML.stringify(svgList));
	};

	generateIconsYml("./node_modules/tabler-icons/icons/*.svg", './src/pages/_data/icons-tabler.yml');
	generateIconsYml("./src/svg/brand/*.svg", './src/pages/_data/icons-brand.yml');
	cb();
});

gulp.task('clean', function () {
	return gulp
		.src('dist/*', { read: false })
		.pipe(clean());
});

gulp.task('start', gulp.series('clean'/*, 'sass', 'js', gulp.parallel('watch-jekyll', 'watch', 'browser-sync')*/));

gulp.task('build', gulp.series('clean'/*, 'sass', 'js'*/));
