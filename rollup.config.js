'use strict';

const path    = require('path');

const pkg = require(path.resolve(__dirname, 'package.json'));

const fileDest = 'tabler.js';
const year = new Date().getFullYear();

const external = ['jquery', 'popper.js'];

const globals = {
    // jquery: 'jQuery',
    // 'popper.js': 'Popper'
};

module.exports = {
    input: path.resolve(__dirname, 'src/assets/js/tabler.js'),
    output: {
        banner: `/*!
  * Tabler v${pkg.version} (${pkg.homepage})
  * Copyright ${year} ${pkg.author}
  * Licensed under MIT (https://github.com/tabler/tabler/blob/master/LICENSE)
  */`,
        file: path.resolve(__dirname, `${fileDest}`),
        format: 'umd',
        globals,
        name: 'tabler'
    },
    // external,
    // plugins
};