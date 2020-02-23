if (!Array.prototype.flat) {
	Object.defineProperty(Array.prototype, 'flat', {
		value: function (depth = 1) {
			return this.reduce(function (flat, toFlatten) {
				return flat.concat((Array.isArray(toFlatten) && (depth > 1)) ? toFlatten.flat(depth - 1) : toFlatten);
			}, []);
		}
	});
}


const all_libs = require('../pages/_data/libs'),
	path = require('path'),
	{ exec } = require('child_process');

let files = [];

Object.keys(all_libs.js).forEach(function (lib) {
	files.push(Array.isArray(all_libs.js[lib]) ? all_libs.js[lib] : [all_libs.js[lib]]);
});

Object.keys(all_libs.css).forEach(function (lib) {
	files.push(Array.isArray(all_libs.css[lib]) ? all_libs.css[lib] : [all_libs.css[lib]]);
});

files = files.flat();

files.forEach(function (file) {
	if(! file.match(/^https?/)) {
		let dirname = path.dirname(file).replace('@', '');
		let cmd = `mkdir -p "dist/libs/${dirname}" && cp -r node_modules/${file} dist/libs/${file.replace('@', '')}`;

		exec(cmd)
	}
});
