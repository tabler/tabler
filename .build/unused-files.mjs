#!/usr/bin/env node

'use strict'

import { globSync } from 'glob'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { readFileSync } from 'node:fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

let foundFiles = []

globSync(path.join(__dirname, `../preview/**/*.{html,md}`)).forEach((file) => {
	let fileContent = readFileSync(file)

	fileContent.toString().replace(/\{% include(_cached)? ([a-z0-9\/_-]+\.html)/g, (f, c, filename) => {
		filename = path.join(__dirname, `../preview/_includes/${filename}`)

		if (!foundFiles.includes(filename)) {
			foundFiles.push(filename)
		}
	})
})

let includeFiles = globSync(path.join(__dirname, `../preview/_includes/**/*.html`))

includeFiles.forEach((file) => {
	if (!foundFiles.includes(file)) {
		console.log('file', file)
	}
})