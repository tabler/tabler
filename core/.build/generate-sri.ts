// Writes the SRI hashes the docs render into their CDN snippets.
//
// The hashes are taken from the files jsDelivr actually serves for the published release, not
// from the local core/dist: the snippets link to @tabler/core@<version>, while dev is usually
// ahead of that release, so hashing the local build would ship an `integrity` value the browser
// rejects — worse for users than no `integrity` at all.
//
// The result is committed to shared/data/sri.json, so a docs build needs neither the network nor
// a prior core build. Run this after publishing a release (`pnpm --filter @tabler/core
// generate-sri`), or with `--check` to verify the committed file still matches the CDN.
import * as crypto from 'node:crypto'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const configFile = path.join(__dirname, '../../shared/data/sri.json')
const { version } = JSON.parse(readFileSync(path.join(__dirname, '../package.json'), 'utf8')) as { version: string }
const cdnUrl = `https://cdn.jsdelivr.net/npm/@tabler/core@${version}/dist`

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

/** Thrown when the version is not on the CDN yet, which is expected between a bump and a publish. */
class UnpublishedVersionError extends Error {}

async function fetchIntegrity(file: string): Promise<string> {
  const response = await fetch(`${cdnUrl}/${file}`)

  if (response.status === 404) {
    throw new UnpublishedVersionError(`${cdnUrl}/${file} returned 404`)
  }

  if (!response.ok) {
    throw new Error(`${cdnUrl}/${file} returned ${response.status} ${response.statusText}`)
  }

  const hash = crypto
    .createHash('sha384')
    .update(Buffer.from(await response.arrayBuffer()))
    .digest('base64')

  return `sha384-${hash}`
}

async function fetchHashes(): Promise<Record<string, string>> {
  const entries = await Promise.all(files.map(async ({ file, configPropertyName }) => [configPropertyName, await fetchIntegrity(file)] as const))

  return Object.fromEntries(entries)
}

function readConfig(): SriData | null {
  if (!existsSync(configFile)) return null

  return JSON.parse(readFileSync(configFile, 'utf8')) as SriData
}

async function generateSRI(check: boolean): Promise<void> {
  let hashes: Record<string, string>

  try {
    hashes = await fetchHashes()
  } catch (error) {
    if (error instanceof UnpublishedVersionError) {
      // Nothing to pin yet. The docs render their snippets without `integrity` until the release
      // is on npm and this script is run again.
      console.warn(`@tabler/core@${version} is not published yet — shared/data/sri.json left unchanged.`)
      return
    }

    throw error
  }

  const current = readConfig()

  if (check) {
    const matches = current?.version === version && files.every(({ configPropertyName }) => current?.hashes[configPropertyName] === hashes[configPropertyName])

    if (!matches) {
      throw new Error(`shared/data/sri.json does not match what the CDN serves for @tabler/core@${version}. Run \`pnpm --filter @tabler/core generate-sri\`.`)
    }

    console.log(`shared/data/sri.json matches @tabler/core@${version}.`)
    return
  }

  for (const { configPropertyName } of files) {
    console.log(`${configPropertyName}: ${hashes[configPropertyName]}`)
  }

  writeFileSync(configFile, JSON.stringify({ version, hashes } satisfies SriData, null, 2) + '\n', 'utf8')
}

generateSRI(process.argv.includes('--check')).catch((error: unknown) => {
  console.error('Failed to generate SRI:', error)
  process.exit(1)
})
