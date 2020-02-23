'use strict';

const BUNDLE = process.env.BUNDLE === 'true';
const dir = BUNDLE ? 'dist' : 'tmp-dist';

import path from 'path';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import minify from 'rollup-plugin-babel-minify';
import commonjs from 'rollup-plugin-commonjs';

const fileDest = 'tabler',
	banner = require('./banner');

let plugins = [
	resolve(),
	commonjs()
];

if (BUNDLE) {
	plugins = plugins.concat([
		babel({
			exclude: 'node_modules/**'
		}),
		minify({
			comments: false
		})
	]);
}


module.exports = {
	context: "window",
	input: {
		tabler: path.resolve(__dirname, '../js/tabler.js'),
	},
	output: {
		banner,
		dir: path.resolve(__dirname, `../${dir}/js/`),
		entryFileNames: BUNDLE ? '[name].min.js' : '[name].js',
		format: 'cjs'
	},
	plugins,
};
