#!/usr/bin/env node

import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs'
import { globSync } from 'glob'
import libs from '../libs.json' with { type: 'json' }
import { fileURLToPath } from 'node:url'
import { join, dirname } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

interface LibConfig {
  npm?: string
  js?: string[]
  css?: string[]
  extra?: string[]
  head?: boolean
}

interface Libs {
  [key: string]: LibConfig
}

const libsData = libs as Libs

rmSync(join(__dirname, '..', 'dist/libs'), { recursive: true, force: true })
mkdirSync(join(__dirname, '..', 'dist/libs'), { recursive: true })

for (const name in libsData) {
  const { npm, js, css, extra } = libsData[name]

  if (npm) {
    const pkgDir = join(__dirname, '..', `node_modules/${npm}`)
    const to = join(__dirname, '..', `dist/libs/${npm}`)

    // create dir in dist/libs
    if (!existsSync(to)) {
      mkdirSync(to, { recursive: true })
    }

    const files = [...(js || []), ...(css || [])]

    for (const pattern of extra || []) {
      const matches = globSync(pattern, { cwd: pkgDir, nodir: true, posix: true })
      if (matches.length === 0) {
        throw new Error(`copy-libs: ${name} — "${pattern}" matched no files in ${npm}`)
      }
      files.push(...matches)
    }

    if (files) {
      for (const file of files) {
        cpSync(join(pkgDir, file), join(to, file), { recursive: true, dereference: true })
      }
    }

    // Ship each upstream license alongside its files — we redistribute the
    // built bundles, and MIT/BSD/Apache all require the notice to travel with them.
    const licenses = globSync('{license,licence,copying}*', { cwd: pkgDir, nodir: true, nocase: true })

    if (licenses.length === 0) {
      console.warn(`Warning: no license file found for ${npm}`)
    }

    for (const file of licenses) {
      cpSync(join(pkgDir, file), join(to, file), { recursive: true, dereference: true })
    }

    console.log(`Successfully copied ${npm}`)
  }
}
