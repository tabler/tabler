#!/usr/bin/env node

import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sh from 'shelljs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

sh.config.fatal = true

const configFile = path.join(__dirname, '../_config.yml')

const files = [
	{
		file: 'dist/css/tabler.min.css',
		configPropertyName: 'css_hash'
	},
	{
		file: 'dist/css/tabler.rtl.min.css',
		configPropertyName: 'css_rtl_hash'
	},
	{
		file: 'dist/js/tabler.min.js',
		configPropertyName: 'js_hash'
	},
	{
		file: 'dist/js/tabler.bundle.min.js',
		configPropertyName: 'js_bundle_hash'
	}
]

for (const { file, configPropertyName } of files) {
	fs.readFile(file, 'utf8', (error, data) => {
		if (error) {
			throw error
		}

		const algorithm = 'sha384'
		const hash = crypto.createHash(algorithm).update(data, 'utf8').digest('base64')
		const integrity = `${algorithm}-${hash}`

		console.log(`${configPropertyName}: ${integrity}`)

		sh.sed('-i', new RegExp(`^(\\s+${configPropertyName}:\\s+["'])\\S*(["'])`), `$1${integrity}$2`, configFile)
	})
}