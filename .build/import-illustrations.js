#!/usr/bin/env node

'use strict'

const fs = require('fs'),
	path = require('path'),
	glob = require('glob');

const illustrations = glob
	.sync(path.join(__dirname, `../src/static/illustrations/light/*.png`))
	.map((file) => {
		return path.basename(file, '.png')
	})

fs.writeFileSync(
	path.join(__dirname, `../src/pages/_data/illustrations.json`),
	JSON.stringify(illustrations)
)
