#!/usr/bin/env node

'use strict'

import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url'
import { sync } from 'glob';
import banner from '@repo/banner';

const __dirname = dirname(fileURLToPath(import.meta.url))

const styles = sync(join(__dirname, '..', 'dist', 'css', '*.css'))

const plugins = {
	'tabler-flags': 'Flags',
	'tabler-flags.rtl': 'Flags RTL',
	'tabler-marketing': 'Marketing',
	'tabler-marketing.rtl': 'Marketing RTL',
	'tabler-payments': 'Payments',
	'tabler-payments.rtl': 'Payments RTL',
	'tabler-socials': 'Socials',
	'tabler-socials.rtl': 'Socials RTL',
	'tabler-vendors': 'Vendors',
	'tabler-vendors.rtl': 'Vendors RTL',
}

styles.forEach((file, i) => {
	const content = readFileSync(file, 'utf8')
	const filename = basename(file)
	const pluginKey = Object.keys(plugins).find(plugin => filename.includes(plugin))
	const plugin = plugins[pluginKey]
	const regex = /^(@charset ['"][a-zA-Z0-9-]+['"];?)\n?/i

	let newContent = ''

	if (content.match(regex)) {
		newContent = content.replace(regex, (m, m1) => {
			return `${m1}\n${banner(plugin)}\n`
		})
	} else {
		newContent = `${banner(plugin)}\n${content}`
	}

	writeFileSync(file, newContent, 'utf8')
})