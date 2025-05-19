#!/usr/bin/env node

'use strict'

import { existsSync, mkdirSync, lstatSync } from 'fs'
import { emptyDirSync, copySync } from 'fs-extra/esm'
import libs from '../libs.json' with { type: 'json' }
import { fileURLToPath } from 'url'
import { join, dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url))

emptyDirSync(join(__dirname, '..', 'dist/libs'))

for(const name in libs) {
	const { npm } = libs[name]

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