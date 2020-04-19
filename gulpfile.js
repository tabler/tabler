const gulp = require('gulp'),
	glob = require('glob'),
	fs = require('fs'),
	path = require('path'),
	YAML = require('yaml'),
	cp = require('child_process');

const prepareSvgFile = function(svg) {
	return svg.replace(/\n/g, '');
};

gulp.task('svg-icons', function (cb) {
	const files = glob.sync("./node_modules/tabler-icons/icons/*.svg");
	let svgList = {};

	files.forEach(function(file){
		const basename = path.basename(file, '.svg');
		svgList[basename] = prepareSvgFile(fs.readFileSync(file).toString());
	});

	fs.writeFileSync('./pages/_data/icons-tabler.yml', YAML.stringify(svgList));
	cb();
});
