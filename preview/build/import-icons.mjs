#!/usr/bin/env node

'use strict'

import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url))

import iconsTags from '../node_modules/@tabler/icons/icons.json';
import { version as _version } from '../node_modules/@tabler/icons/package.json';

const prepareSvgFile = (svg) => {
	return svg.replace(/\n/g, '').replace(/>\s+</g, '><').replace(/\s+/g, ' ')
}

let svgList = {}
for (let iconName in iconsTags) {
	let iconData = iconsTags[iconName]
	svgList[iconName] = {
		name: iconName,
		svg: {
			outline: iconData.styles.outline ? prepareSvgFile(readFileSync(join(__dirname, `../node_modules/@tabler/icons/icons/outline/${iconName}.svg`), 'utf8')) : null,
			filled: iconData.styles.filled ? prepareSvgFile(readFileSync(join(__dirname, `../node_modules/@tabler/icons/icons/filled/${iconName}.svg`), 'utf8')) : null,
		}
	}
}

writeFileSync(
	join(__dirname, `../src/pages/_data/icons-info.json`),
	JSON.stringify({
		version: _version,
		count: Object.values(svgList).reduce((acc, icon) => {
			return acc + (icon.svg.outline ? 1 : 0) + (icon.svg.filled ? 1 : 0)
		}, 0)
	})
)

writeFileSync(join(__dirname, `../src/pages/_data/icons.json`), JSON.stringify(svgList))