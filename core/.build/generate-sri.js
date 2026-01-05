const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

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
]

function generateSRI() {
	const sriData = {}

	for (const { file, configPropertyName } of files) {
		try {
			const filePath = path.join(__dirname, '..', file)
			const data = fs.readFileSync(filePath, 'utf8')

			const algorithm = 'sha384'
			const hash = crypto.createHash(algorithm).update(data, 'utf8').digest('base64')
			const integrity = `${algorithm}-${hash}`

			console.log(`${configPropertyName}: ${integrity}`)

			sriData[configPropertyName] = integrity
		} catch (error) {
			console.error(`Error processing ${file}:`, error.message)
			throw error
		}
	}

	fs.writeFileSync(configFile, JSON.stringify(sriData, null, 2) + '\n', 'utf8')
}

try {
	generateSRI()
} catch (error) {
	console.error('Failed to generate SRI:', error)
	process.exit(1)
}