#!/usr/bin/env node

import AdmZip from 'adm-zip'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { readFileSync } from 'node:fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

interface PackageJson {
  version: string
  [key: string]: unknown
}

const pkg: PackageJson = JSON.parse(readFileSync(path.join(__dirname, '../core', 'package.json'), 'utf8'))

// macOS and Windows drop these files into the folders they browse, so a zip
// built there ships them to everyone who downloads the package.
const junkFiles = ['.DS_Store', 'Thumbs.db']
const isJunk = (entry: string): boolean => junkFiles.includes(path.basename(entry))

const zip = new AdmZip()
zip.addLocalFolder(path.join(__dirname, '../preview/dist'), 'dashboard', (entry: string) => !isJunk(entry))

zip.addLocalFile(path.join(__dirname, '../shared/static', 'og.png'), '.', 'preview.png')

zip.addFile('documentation.url', Buffer.from('[InternetShortcut]\nURL = https://tabler.io/docs'))

const outputZipPath = path.join(__dirname, '../packages-zip', `tabler-${pkg.version}.zip`)

zip.writeZip(outputZipPath)

console.log(`Zipped folder to ${outputZipPath}`)
