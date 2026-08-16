// Writes the SRI hashes the docs render into their CDN snippets.
//
// Hashes describe the published release the snippets link to (@tabler/core@<version>), so this
// only runs at release time: the release workflow builds core, publishes that build to npm, and
// then hashes the same core/dist it just published. Running it mid-cycle would pin hashes of an
// unreleased build — an `integrity` value the browser rejects, which is worse for users than no
// `integrity` at all.
//
// The result is committed to shared/data/sri.json, so a docs build needs neither the network nor
// a prior core build. `--check` verifies the committed file against what jsDelivr actually serves,
// which is the independent way to catch hashes generated at the wrong moment.
import * as crypto from 'node:crypto'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const configFile = path.join(__dirname, '../../shared/data/sri.json')
const distDir = path.join(__dirname, '../dist')
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

const integrityOf = (data: Buffer): string => `sha384-${crypto.createHash('sha384').update(data).digest('base64')}`

/** Hashes of the local build — the files the release workflow is about to publish, or just did. */
function hashDist(): Record<string, string> {
  const entries = files.map(({ file, configPropertyName }) => {
    const filePath = path.join(distDir, file)

    if (!existsSync(filePath)) {
      throw new Error(`${filePath} is missing. Run \`pnpm --filter @tabler/core build\` first.`)
    }

    return [configPropertyName, integrityOf(readFileSync(filePath))] as const
  })

  return Object.fromEntries(entries)
}

async function fetchIntegrity(file: string): Promise<string> {
  const response = await fetch(`${cdnUrl}/${file}`)

  if (response.status === 404) {
    throw new UnpublishedVersionError(`${cdnUrl}/${file} returned 404`)
  }

  if (!response.ok) {
    throw new Error(`${cdnUrl}/${file} returned ${response.status} ${response.statusText}`)
  }

  return integrityOf(Buffer.from(await response.arrayBuffer()))
}

/** Hashes of what the CDN serves, used by `--check` to verify the committed file. */
async function fetchHashes(): Promise<Record<string, string>> {
  const entries = await Promise.all(files.map(async ({ file, configPropertyName }) => [configPropertyName, await fetchIntegrity(file)] as const))

  return Object.fromEntries(entries)
}

function readConfig(): SriData | null {
  if (!existsSync(configFile)) return null

  return JSON.parse(readFileSync(configFile, 'utf8')) as SriData
}

async function check(): Promise<void> {
  let published: Record<string, string>

  try {
    published = await fetchHashes()
  } catch (error) {
    if (error instanceof UnpublishedVersionError) {
      // Between a version bump and the publish there is nothing to compare against. The docs
      // render their snippets without `integrity` in that window, which is safe.
      console.warn(`@tabler/core@${version} is not published yet — nothing to check.`)
      return
    }

    throw error
  }

  const current = readConfig()
  const matches = current?.version === version && files.every(({ configPropertyName }) => current?.hashes[configPropertyName] === published[configPropertyName])

  if (!matches) {
    throw new Error(`shared/data/sri.json does not match what the CDN serves for @tabler/core@${version}. It was generated from a build that was never published.`)
  }

  console.log(`shared/data/sri.json matches @tabler/core@${version}.`)
}

function generate(): void {
  const hashes = hashDist()

  for (const { configPropertyName } of files) {
    console.log(`${configPropertyName}: ${hashes[configPropertyName]}`)
  }

  writeFileSync(configFile, JSON.stringify({ version, hashes } satisfies SriData, null, 2) + '\n', 'utf8')
}

const run = process.argv.includes('--check') ? check() : Promise.resolve(generate())

run.catch((error: unknown) => {
  console.error('Failed to generate SRI:', error)
  process.exit(1)
})
