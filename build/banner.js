/*
 * Tabler (v0.9.0): banner.js
 * Copyright 2018-2019 The Tabler Authors
 * Copyright 2018-2019 codecalm
 * Licensed under MIT (https://github.com/tabler/tabler/blob/master/LICENSE)
 */

'use strict';

const pkg = require('../package.json'),
	year = new Date().getFullYear();

function getBanner(pluginFilename) {
	return `/*!
  * Tabler${pluginFilename ? ` ${pluginFilename}` : ''} v${pkg.version} (${pkg.homepage})
  * Copyright 2018-${year} ${pkg.author}
  * Licensed under ${pkg.license} (https://github.com/tabler/tabler/blob/master/LICENSE)
  */`;
}

module.exports = getBanner;
