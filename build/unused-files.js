#!/usr/bin/env node

const glob = require("glob"),
	fs = require("fs");

let foundFiles = [];

glob.sync("pages/**/*.{html,md}").forEach(function (file) {
	let fileContent = fs.readFileSync(file);

	fileContent.toString().replace(/\{% include(_cached)? ([a-z0-9\/_-]+\.html)/g, function (f, c, filename) {
		filename = 'pages/_includes/' + filename;

		if (!foundFiles.includes(filename)) {
			foundFiles.push(filename);
		}
	});
});

let includeFiles = glob.sync("pages/_includes/**/*.html");

includeFiles.forEach(function (file) {
	if (!foundFiles.includes(file)) {
		console.log('file', file);
	}
});
