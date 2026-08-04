#!/usr/bin/env node

import { existsSync, mkdirSync } from 'node:fs'
import { globSync } from 'glob'
import { emptyDirSync, copySync } from 'fs-extra/esm'
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

emptyDirSync(join(__dirname, '..', 'dist/libs'))

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

    if (js || css) {
      for (const file of files) {
        copySync(join(pkgDir, file), join(to, file), {
          dereference: true,
        })
      }
    }

    console.log(`Successfully copied ${npm}`)
  }
}
