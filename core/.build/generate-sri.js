const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const sh = require('shelljs');

sh.config.fatal = true

const configFile = path.join(__dirname, '../../shared/data/sri.json')

const files = [
	{
		file: 'dist/css/tabler.min.css',
		configPropertyName: 'css'
	},
	{
		file: 'dist/css/tabler.rtl.min.css',
		configPropertyName: 'css-rtl'
	},
	{
		file: 'dist/css/tabler-flags.min.css',
		configPropertyName: 'css-flags'
	},
	{
		file: 'dist/css/tabler-flags.rtl.min.css',
		configPropertyName: 'css-flags-rtl'
	},
	{
		file: 'dist/css/tabler-marketing.min.css',
		configPropertyName: 'css-marketing'
	},
	{
		file: 'dist/css/tabler-marketing.rtl.min.css',
		configPropertyName: 'css-marketing-rtl'
	},
	{
		file: 'dist/css/tabler-payments.min.css',
		configPropertyName: 'css-payments'
	},
	{
		file: 'dist/css/tabler-payments.rtl.min.css',
		configPropertyName: 'css-payments-rtl'
	},
	{
		file: 'dist/css/tabler-props.min.css',
		configPropertyName: 'css-props'
	},
	{
		file: 'dist/css/tabler-props.rtl.min.css',
		configPropertyName: 'css-props-rtl'
	},
	{
		file: 'dist/css/tabler-themes.min.css',
		configPropertyName: 'css-themes'
	},
	{
		file: 'dist/css/tabler-themes.rtl.min.css',
		configPropertyName: 'css-themes-rtl'
	},
	{
		file: 'dist/css/tabler-socials.min.css',
		configPropertyName: 'css-socials'
	},
	{
		file: 'dist/css/tabler-socials.rtl.min.css',
		configPropertyName: 'css-socials-rtl'
	},
	{
		file: 'dist/css/tabler-vendors.min.css',
		configPropertyName: 'css-vendors'
	},
	{
		file: 'dist/css/tabler-vendors.rtl.min.css',
		configPropertyName: 'css-vendors-rtl'
	},
	{
		file: 'dist/js/tabler.min.js',
		configPropertyName: 'js'
	},
	{
		file: 'dist/js/tabler-theme.min.js',
		configPropertyName: 'js-theme'
	},
	// {
	// 	file: 'dist/preview/css/demo.min.css',
	// 	configPropertyName: 'demo-css'
	// },
	// {
	// 	file: 'dist/preview/js/demo.min.js',
	// 	configPropertyName: 'demo-js'
	// },
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