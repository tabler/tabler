#!/usr/bin/env node

'use strict'

const fs = require('fs'),
	path = require('path');

const iconsTags = require('../node_modules/@tabler/icons/icons.json'),
	iconsPkg = require('../node_modules/@tabler/icons/package.json');

const prepareSvgFile = (svg) => {
	return svg.replace(/\n/g, '').replace(/>\s+</g, '><').replace(/\s+/g, ' ')
}

let svgList = {}
for (let iconName in iconsTags) {
	let iconData = iconsTags[iconName]
	svgList[iconName] = {
		name: iconName,
		svg: {
			outline: iconData.styles.outline ? prepareSvgFile(fs.readFileSync(path.join(__dirname, `../node_modules/@tabler/icons/icons/outline/${iconName}.svg`), 'utf8')) : null,
			filled: iconData.styles.filled ? prepareSvgFile(fs.readFileSync(path.join(__dirname, `../node_modules/@tabler/icons/icons/filled/${iconName}.svg`), 'utf8')) : null,
		}
	}
}

fs.writeFileSync(
	path.join(__dirname, `../src/pages/_data/icons-info.json`),
	JSON.stringify({
		version: iconsPkg.version,
		count: Object.values(svgList).reduce((acc, icon) => {
			return acc + (icon.svg.outline ? 1 : 0) + (icon.svg.filled ? 1 : 0)
		}, 0)
	})
)

fs.writeFileSync(path.join(__dirname, `../src/pages/_data/icons.json`), JSON.stringify(svgList))