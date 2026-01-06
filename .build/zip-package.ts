#!/usr/bin/env node

import AdmZip from 'adm-zip'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { readFileSync } from 'node:fs'

// Get __dirname in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url))

interface PackageJson {
	version: string
	[key: string]: unknown
}

const pkg: PackageJson = JSON.parse(
	readFileSync(path.join(__dirname, '../core', 'package.json'), 'utf8')
)

// Create zip instance and add folder
const zip = new AdmZip()
zip.addLocalFolder(path.join(__dirname, '../preview/dist'), 'dashboard')

zip.addLocalFile(
	path.join(__dirname, '../preview/static', 'og.png'),
	'.',
	'preview.png'
)

zip.addFile(
	'documentation.url',
	Buffer.from('[InternetShortcut]\nURL = https://tabler.io/docs')
)

// Folder to zip and output path
const outputZipPath = path.join(
	__dirname,
	'../packages-zip',
	`tabler-${pkg.version}.zip`
)

// Write the zip file
zip.writeZip(outputZipPath)

console.log(`Zipped folder to ${outputZipPath}`)

