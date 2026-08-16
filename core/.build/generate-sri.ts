// Writes the SRI hashes the docs render into their CDN snippets.
//
// Hashes describe the release the snippets link to (@tabler/core@<version>), so this only runs at
// release time: the release workflow builds core, publishes that build to npm, and then hashes the
// same core/dist it just published. Running it mid-cycle would pin hashes of an unreleased build —
// an `integrity` value the browser rejects, which is worse for users than no `integrity` at all.
//
// The result is committed to shared/data/sri.json, so a docs build needs no prior core build. The
// version stored next to the hashes is what the docs check before rendering them.
//
// There is deliberately no package.json script for this: .github/workflows/release.yml calls it as
// `pnpm exec tsx core/.build/generate-sri.ts`, and that release is the only place it belongs.
import * as crypto from 'node:crypto'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const configFile = path.join(__dirname, '../../shared/data/sri.json')
const distDir = path.join(__dirname, '../dist')
const { version } = JSON.parse(readFileSync(path.join(__dirname, '../package.json'), 'utf8')) as { version: string }

interface FileConfig {
  file: string
  configPropertyName: string
}

interface SriData {
  version: string
  hashes: Record<string, string>
}

const files: FileConfig[] = [
  {
    file: 'css/tabler.min.css',
    configPropertyName: 'css',
  },
  {
    file: 'css/tabler.rtl.min.css',
    configPropertyName: 'css-rtl',
  },
  {
    file: 'css/tabler-flags.min.css',
    configPropertyName: 'css-flags',
  },
  {
    file: 'css/tabler-flags.rtl.min.css',
    configPropertyName: 'css-flags-rtl',
  },
  {
    file: 'css/tabler-marketing.min.css',
    configPropertyName: 'css-marketing',
  },
  {
    file: 'css/tabler-marketing.rtl.min.css',
    configPropertyName: 'css-marketing-rtl',
  },
  {
    file: 'css/tabler-payments.min.css',
    configPropertyName: 'css-payments',
  },
  {
    file: 'css/tabler-payments.rtl.min.css',
    configPropertyName: 'css-payments-rtl',
  },
  {
    file: 'css/tabler-props.min.css',
    configPropertyName: 'css-props',
  },
  {
    file: 'css/tabler-props.rtl.min.css',
    configPropertyName: 'css-props-rtl',
  },
  {
    file: 'css/tabler-themes.min.css',
    configPropertyName: 'css-themes',
  },
  {
    file: 'css/tabler-themes.rtl.min.css',
    configPropertyName: 'css-themes-rtl',
  },
  {
    file: 'css/tabler-socials.min.css',
    configPropertyName: 'css-socials',
  },
  {
    file: 'css/tabler-socials.rtl.min.css',
    configPropertyName: 'css-socials-rtl',
  },
  {
    file: 'css/tabler-vendors.min.css',
    configPropertyName: 'css-vendors',
  },
  {
    file: 'css/tabler-vendors.rtl.min.css',
    configPropertyName: 'css-vendors-rtl',
  },
  {
    file: 'js/tabler.min.js',
    configPropertyName: 'js',
  },
  {
    file: 'js/tabler-theme.min.js',
    configPropertyName: 'js-theme',
  },
]

function generateSRI(): void {
  const hashes: Record<string, string> = {}

  for (const { file, configPropertyName } of files) {
    const filePath = path.join(distDir, file)

    if (!existsSync(filePath)) {
      throw new Error(`${filePath} is missing. Run \`pnpm --filter @tabler/core build\` first.`)
    }

    const integrity = `sha384-${crypto.createHash('sha384').update(readFileSync(filePath)).digest('base64')}`

    console.log(`${configPropertyName}: ${integrity}`)

    hashes[configPropertyName] = integrity
  }

  writeFileSync(configFile, JSON.stringify({ version, hashes } satisfies SriData, null, 2) + '\n', 'utf8')
}

try {
  generateSRI()
} catch (error) {
  console.error('Failed to generate SRI:', error)
  process.exit(1)
}
