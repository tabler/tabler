const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const sh = require('shelljs');

sh.config.fatal = true

const configFile = path.join(__dirname, '../eleventy.config.mjs')

const files = [
	{
		file: 'dist/css/tabler.min.css',
		configPropertyName: 'css-hash'
	},
	{
		file: 'dist/css/tabler.rtl.min.css',
		configPropertyName: 'css-rtl-hash'
	},
	{
		file: 'dist/css/tabler-flags.min.css',
		configPropertyName: 'css-flags-hash'
	},
	{
		file: 'dist/css/tabler-flags.rtl.min.css',
		configPropertyName: 'css-flags-rtl-hash'
	},
	{
		file: 'dist/css/tabler-marketing.min.css',
		configPropertyName: 'css-marketing-hash'
	},
	{
		file: 'dist/css/tabler-marketing.rtl.min.css',
		configPropertyName: 'css-marketing-rtl-hash'
	},
	{
		file: 'dist/css/tabler-payments.min.css',
		configPropertyName: 'css-payments-hash'
	},
	{
		file: 'dist/css/tabler-payments.rtl.min.css',
		configPropertyName: 'css-payments-rtl-hash'
	},
	{
		file: 'dist/css/tabler-socials.min.css',
		configPropertyName: 'css-socials-hash'
	},
	{
		file: 'dist/css/tabler-socials.rtl.min.css',
		configPropertyName: 'css-socials-rtl-hash'
	},
	{
		file: 'dist/css/tabler-vendors.min.css',
		configPropertyName: 'css-vendors-hash'
	},
	{
		file: 'dist/css/tabler-vendors.rtl.min.css',
		configPropertyName: 'css-vendors-rtl-hash'
	},
	{
		file: 'dist/js/tabler.min.js',
		configPropertyName: 'js-hash'
	},
]

for (const { file, configPropertyName } of files) {
	fs.readFile(path.join(__dirname, '..', file), 'utf8', (error, data) => {
		if (error) {
			throw error
		}

		const algorithm = 'sha384'
		const hash = crypto.createHash(algorithm).update(data, 'utf8').digest('base64')
		const integrity = `${algorithm}-${hash}`

		console.log(`${configPropertyName}: ${integrity}`)

		sh.sed('-i', new RegExp(`^(\\s+"${configPropertyName}":\\s+["'])\\S*(["'])`), `$1${integrity}$2`, configFile)
	})
}