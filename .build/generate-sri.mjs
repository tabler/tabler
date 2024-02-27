#!/usr/bin/env node

'use strict'

import crypto from 'crypto'
import { readFileSync, write, writeFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

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
		file: 'dist/css/tabler-flags.min.css',
		configPropertyName: 'css_flags_hash'
	},
	{
		file: 'dist/css/tabler-payments.min.css',
		configPropertyName: 'css_payments_hash'
	},
	{
		file: 'dist/css/tabler-social.min.css',
		configPropertyName: 'css_social_hash'
	},
	{
		file: 'dist/css/tabler-vendors.min.css',
		configPropertyName: 'css_vendors_hash'
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

files.forEach((file) => {
	const data = readFileSync(path.join(__dirname, '../core', file.file), 'utf8')

	const algo = 'sha384'
	const hash = crypto.createHash(algo).update(data, 'utf8').digest('base64')
	const integrity = `${algo}-${hash}`

	console.log(`${file.configPropertyName}: ${integrity}`)

	let config = readFileSync(configFile, 'utf8')

	const regex = new RegExp(`${file.configPropertyName}\\:\\s+("|')(\\S+)(\\1)`, 'gm')
	config = config.replace(regex, function() {
		return `${file.configPropertyName}: ${arguments[1]}${integrity}${arguments[3]}`
	})

	writeFileSync(configFile, config, 'utf8')
})