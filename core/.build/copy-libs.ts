#!/usr/bin/env node

import { existsSync, mkdirSync } from 'node:fs'
import { emptyDirSync, copySync } from 'fs-extra/esm'
import libs from '../libs.json' with { type: 'json' }
import { fileURLToPath } from 'node:url'
import { join, dirname } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

interface LibConfig {
	npm?: string
	js?: string[]
	css?: string[]
	head?: boolean
}

interface Libs {
	[key: string]: LibConfig
}

const libsData = libs as Libs

emptyDirSync(join(__dirname, '..', 'dist/libs'))

for (const name in libsData) {
	const { npm } = libsData[name]

	if (npm) {
		const from = join(__dirname, '..', `node_modules/${npm}`)
		const to = join(__dirname, '..', `dist/libs/${npm}`)

		// create dir in dist/libs
		if (!existsSync(to)) {
			mkdirSync(to, { recursive: true })
		}

		copySync(from, to, {
			dereference: true,
		})

		console.log(`Successfully copied ${npm}`)
	}
}

