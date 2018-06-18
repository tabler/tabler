'use strict';

const path = require('path');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonJS = require('rollup-plugin-commonjs');

const pkg = require(path.resolve(__dirname, 'package.json'));
const bundle = process.env.bundle === 'true';

let fileDest = 'tabler.js';
const year = new Date().getFullYear();

let plugins = [
    commonJS({
        include: 'node_modules/**'
    })
];

if (bundle) {
    fileDest = 'tabler.bundle.js';
    plugins.push(resolve());
}

module.exports = {
    input: path.resolve(__dirname, 'src/assets/js/index.js'),
    output: {
        banner: `/*!
  * Tabler v${pkg.version} (${pkg.homepage})
  * Copyright ${year} ${pkg.author}
  * Licensed under MIT (https://github.com/tabler/tabler/blob/master/LICENSE)
  */`,
        file: path.resolve(__dirname, `js/dist/${fileDest}`),
        format: 'umd',
        name: 'tabler',
        sourcemap: true
    },
    external: ['jquery'],
    plugins
};