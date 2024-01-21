#!/usr/bin/env node

'use strict'

import { execFile } from 'node:child_process'
import fs from 'node:fs/promises'
import process from 'node:process'

const VERBOSE = process.argv.includes('--verbose')
const DRY_RUN = process.argv.includes('--dry') || process.argv.includes('--dry-run')

const FILES = [
	'test.md',
	'preview/_config.yml'
]

function regExpQuote(string) {
	return string.replace(/[$()*+-.?[\\\]^{|}]/g, '\\$&')
}

function regExpQuoteReplacement(string) {
	return string.replace(/\$/g, '$$')
}

async function replaceRecursively(file, oldVersion, newVersion) {
	const originalString = await fs.readFile(file, 'utf8')
	const newString = originalString
		.replace(
			new RegExp(regExpQuote(oldVersion), 'g'),
			regExpQuoteReplacement(newVersion)
		)
		// Also replace the version used by the rubygem,
		// which is using periods (`.`) instead of hyphens (`-`)
		.replace(
			new RegExp(regExpQuote(oldVersion.replace(/-/g, '.')), 'g'),
			regExpQuoteReplacement(newVersion.replace(/-/g, '.'))
		)

	// No need to move any further if the strings are identical
	if (originalString === newString) {
		return
	}

	if (VERBOSE) {
		console.log(`Found ${oldVersion} in ${file}`)
	}

	if (DRY_RUN) {
		return
	}

	await fs.writeFile(file, newString, 'utf8')
}

function showUsage(args) {
	console.error('USAGE: change-version old_version new_version [--verbose] [--dry[-run]]')
	console.error('Got arguments:', args)
	process.exit(1)
}

function bumpPnpmVersion(newVersion) {
	if (DRY_RUN) {
		return
	}

	execFile('pnpm', ['version', '-r', newVersion, '--no-git-tag'], { shell: true }, error => {
		if (error) {
			console.error(error)
			process.exit(1)
		}
	})
}

async function main(args) {
	let [oldVersion, newVersion] = args

	if (!oldVersion || !newVersion) {
		showUsage(args)
	}

	[oldVersion, newVersion] = [oldVersion, newVersion].map(arg => {
		return arg.startsWith('v') ? arg.slice(1) : arg
	})

	if (oldVersion === newVersion) {
		showUsage(args)
	}

	bumpPnpmVersion(newVersion)

	try {
		await Promise.all(
			FILES.map(file => replaceRecursively(file, oldVersion, newVersion))
		)
	} catch (error) {
		console.error(error)
		process.exit(1)
	}
}

main(process.argv.slice(2))