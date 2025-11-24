#!/usr/bin/env node

'use strict'

import { existsSync, mkdirSync } from 'fs'
import { copySync } from 'fs-extra/esm'
import { fileURLToPath } from 'url'
import { join, dirname } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const fromDir = join(__dirname, '..', 'node_modules/geist/dist/fonts')
const toDir = join(__dirname, '..', 'fonts')

// Create fonts directory if it doesn't exist
if (!existsSync(toDir)) {
	mkdirSync(toDir, { recursive: true })
}

// Copy geist-mono fonts
const monoFrom = join(fromDir, 'geist-mono')
const monoTo = join(toDir, 'geist-mono')

if (existsSync(monoFrom)) {
	if (!existsSync(monoTo)) {
		mkdirSync(monoTo, { recursive: true })
	}
	
	copySync(monoFrom, monoTo, {
		dereference: true,
	})
	
	console.log(`Successfully copied geist-mono fonts`)
} else {
	console.warn(`Warning: geist-mono fonts not found at ${monoFrom}`)
}

// Copy geist-sans fonts
const sansFrom = join(fromDir, 'geist-sans')
const sansTo = join(toDir, 'geist-sans')

if (existsSync(sansFrom)) {
	if (!existsSync(sansTo)) {
		mkdirSync(sansTo, { recursive: true })
	}
	
	copySync(sansFrom, sansTo, {
		dereference: true,
	})
	
	console.log(`Successfully copied geist-sans fonts`)
} else {
	console.warn(`Warning: geist-sans fonts not found at ${sansFrom}`)
}

