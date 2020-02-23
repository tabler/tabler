const BUNDLE = process.env.BUNDLE === 'true';

const path = require('path'),
	glob = require("glob"),
	fs = require("fs"),
	sass = require("node-sass"),
	packageImporter = require('node-sass-package-importer');

const dir = BUNDLE ? 'dist' : 'tmp-dist';

glob("scss/{tabler*,demo}.scss", {}, function (er, files) {
	files.forEach(function (file) {
		var basename = path.basename(file, '.scss');

		sass.render(
			{
				file: file,
				outFile: `${dir}/css/${basename}.css`,
				sourceMap: true,
				sourceMapContents: true,
				precision: 7,
				importer: packageImporter()
			},
			(error, result) => {
				if (!error) {
					fs.writeFile(`${dir}/css/${basename}.css`, result.css, error => {
						if (error) {
							console.log(error);
						}
					});

					fs.writeFile(`${dir}/css/${basename}.css.map`, result.map, error => {
						if (error) {
							console.log(error);
						}
					});
				} else {
					throw error;
				}
			}
		);
	});
});
