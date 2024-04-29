#!/usr/bin/env node

'use strict'

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const libs = JSON.parse(fs.readFileSync(path.join(__dirname, '../pages/_data/libs.json'), 'utf8'))

const allFiles = [...(Object.values(libs.js)), ...(Object.values(libs.css))]

allFiles.forEach((file) => {
	const files = Array.isArray(file) ? file : [file]

	files.forEach(file => {
		if (!file.startsWith('http') && fs.existsSync(path.join(__dirname, '../node_modules', file))) {
			console.log(`Copying ${file} to pages/assets/libs/${file}`)
			fs.cpSync(path.join(__dirname, '../node_modules', file), path.join(__dirname, '../pages/assets/libs', file), { recursive: true })
		}
	});
})