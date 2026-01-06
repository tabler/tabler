#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'
import { sync } from 'glob'
import banner from '../../shared/banner/index.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))

const styles: string[] = sync(join(__dirname, '..', 'dist', 'css', '*.css'))

interface Plugins {
	[key: string]: string
}

const plugins: Plugins = {
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

styles.forEach((file: string) => {
	const content = readFileSync(file, 'utf8')
	const filename = basename(file)
	const pluginKey = Object.keys(plugins).find((plugin: string) => filename.includes(plugin))
	const plugin = pluginKey ? plugins[pluginKey] : undefined
	const regex = /^(@charset ['"][a-zA-Z0-9-]+['"];?)\n?/i

	let newContent = ''
	const bannerText = banner(plugin)

	if (content.match(regex)) {
		newContent = content.replace(regex, (m: string, m1: string) => {
			return `${m1}\n${bannerText}\n`
		})
	} else {
		newContent = `${bannerText}\n${content}`
	}

	writeFileSync(file, newContent, 'utf8')
})

