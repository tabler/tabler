/*
 * Tabler (v0.9.0): rollup.config.js
 * Copyright 2018-2019 The Tabler Authors
 * Copyright 2018-2019 codecalm
 * Licensed under MIT (https://github.com/tabler/tabler/blob/master/LICENSE)
 */

'use strict';

const BUNDLE  = process.env.BUNDLE === 'true';

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
    'tabler-charts': path.resolve(__dirname, '../js/tabler-charts.js'),
    'daterangepicker': path.resolve(__dirname,'../js/daterangepicker.js')
  },
  output: {
    banner,
    // name: 'tabler',
    dir: path.resolve(__dirname, `../dist/js/`),
    entryFileNames: BUNDLE ? '[name].min.js' : '[name].js',
    format: 'cjs'
  },
  plugins,
};
