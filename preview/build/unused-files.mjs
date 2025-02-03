#!/usr/bin/env node

import { sync } from 'glob';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url))

const srcDir = join(__dirname, '..')

let foundFiles = []
sync(`${srcDir}/pages/**/*.{html,md}`).forEach((file) => {
	let fileContent = readFileSync(file)

	fileContent.toString().replace(/\{% include(_cached)? "([a-z0-9\/_-]+\.html)"/g, (f, c, filename) => {
		filename = `${srcDir}/pages/_includes/${filename}`

		if (!foundFiles.includes(filename)) {
			foundFiles.push(filename)
		}
	})
})

let includeFiles = sync(`${srcDir}/pages/_includes/**/*.html`)

includeFiles.forEach((file) => {
	if (!foundFiles.includes(file)) {
		console.log('file', file)
	}
})