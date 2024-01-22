#!/usr/bin/env node

'use strict'

import { fileURLToPath } from 'node:url'
import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'

import iconsTags from '../node_modules/@tabler/icons/tags.json' assert { type: "json" }
import iconsPkg from '../node_modules/@tabler/icons/package.json' assert { type: "json" }

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const prepareSvgFile = (svg) => {
	return svg.replace(/\n/g, '').replace(/>\s+</g, '><')
}

let svgList = {}
for (let iconName in iconsTags) {
	let iconData = iconsTags[iconName]
	svgList[iconName] = {
		name: iconName,
		version: iconData.version,
		category: iconData.category,
		tags: iconData.tags,
		unicode: iconData.unicode,
		svg: prepareSvgFile(
			readFileSync(
				path.join(
					__dirname,
					`../node_modules/@tabler/icons/icons/${iconName}.svg`
				)
			)
				.toString())

	}
}

writeFileSync(
	path.join(__dirname, `../preview/pages/_data/icons-info.json`),
	JSON.stringify({
		version: iconsPkg.version,
		count: Object.keys(svgList).length,
	})
)

writeFileSync(
	path.join(__dirname, `../preview/pages/_data/icons.json`),
	JSON.stringify(svgList)
)