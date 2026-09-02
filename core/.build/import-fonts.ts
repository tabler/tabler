#!/usr/bin/env node

import { cpSync, existsSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { join, dirname } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const fromDir = join(__dirname, '..', 'node_modules/geist/dist/fonts')
const toDir = join(__dirname, '..', 'fonts')

if (!existsSync(toDir)) {
  mkdirSync(toDir, { recursive: true })
}

const monoFrom = join(fromDir, 'geist-mono')
const monoTo = join(toDir, 'geist-mono')

if (existsSync(monoFrom)) {
  if (!existsSync(monoTo)) {
    mkdirSync(monoTo, { recursive: true })
  }

  cpSync(monoFrom, monoTo, { recursive: true, dereference: true })

  console.log(`Successfully copied geist-mono fonts`)
} else {
  console.warn(`Warning: geist-mono fonts not found at ${monoFrom}`)
}

const sansFrom = join(fromDir, 'geist-sans')
const sansTo = join(toDir, 'geist-sans')

if (existsSync(sansFrom)) {
  if (!existsSync(sansTo)) {
    mkdirSync(sansTo, { recursive: true })
  }

  cpSync(sansFrom, sansTo, { recursive: true, dereference: true })

  console.log(`Successfully copied geist-sans fonts`)
} else {
  console.warn(`Warning: geist-sans fonts not found at ${sansFrom}`)
}
