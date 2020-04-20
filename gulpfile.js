const gulp = require('gulp'),
	glob = require('glob'),
	fs = require('fs'),
	path = require('path'),
	YAML = require('yaml'),
	cp = require('child_process');

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

gulp.task('svg-icons', function (cb) {
	generateIconsYml("./node_modules/tabler-icons/icons/*.svg", './pages/_data/icons-tabler.yml');
	generateIconsYml("./svg/brand/*.svg", './pages/_data/icons-brand.yml');
	cb();
});
