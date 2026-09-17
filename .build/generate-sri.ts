#!/usr/bin/env node
// Regenerates shared/data/sri.json, the Subresource Integrity hashes the docs put into the CDN
// snippets. The hashes are read from the files jsDelivr already serves for the published
// @tabler/core version, never from a local build: a local dist is not the file the browser
// downloads, so its hash would make the browser block the stylesheet or the script.
//
// Run: pnpm run generate-sri          (after `changeset publish`, once the version is on npm)
//      pnpm run generate-sri --wait   (same, but waits for the release to reach npm and the CDN)
//      pnpm run check:sri             (verifies the committed hashes still match the CDN)
import { createHash } from 'node:crypto'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { site } from '../shared/lib/site'

interface SriData {
  version: string
  algorithm: string
  files: Record<string, string>
}

const algorithm = 'sha384'
const waitMinutes = 10

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(__dirname, '..')
const dataFile = join(repoRoot, 'shared/data/sri.json')

// The files the docs hand out as CDN tags. The plugin bundles in `dist/libs/` are not here: they
// are third-party packages the docs only link to, and each one has its own version.
const files = ['dist/css/tabler.min.css', 'dist/css/tabler.rtl.min.css', 'dist/js/tabler.min.js', 'dist/js/tabler-theme.min.js', ...site.cssPlugins.flatMap((plugin) => [`dist/css/tabler-${plugin}.min.css`, `dist/css/tabler-${plugin}.rtl.min.css`])]

/** One GET, retried once: a single dropped connection should not fail a CI job. */
async function get(url: string): Promise<Response> {
  for (let attempt = 1; ; attempt++) {
    try {
      const response = await fetch(url)
      if (response.ok || response.status === 404 || attempt === 2) {
        return response
      }
      console.warn(`generate-sri: ${url} returned ${response.status}, retrying`)
    } catch (error: unknown) {
      if (attempt === 2) {
        throw error
      }
      console.warn(`generate-sri: ${url} failed (${error instanceof Error ? error.message : String(error)}), retrying`)
    }
  }
}

/** Whether the version in core/package.json is on npm, and so on the CDN as well. */
async function isPublished(): Promise<boolean> {
  return (await get(`https://registry.npmjs.org/@tabler/core/${site.version}`)).ok
}

/** The integrity value of one published file, downloaded from the CDN the docs point at. */
async function hashFile(file: string): Promise<string> {
  const url = `${site.cdnUrl}/${file}`
  const response = await get(url)

  if (!response.ok) {
    throw new Error(`generate-sri: ${url} returned ${response.status}`)
  }

  const body = Buffer.from(await response.arrayBuffer())

  return `${algorithm}-${createHash(algorithm).update(body).digest('base64')}`
}

async function collectHashes(): Promise<SriData> {
  const hashes = await Promise.all(files.map(async (file) => [file, await hashFile(file)] as const))

  return { version: site.version, algorithm, files: Object.fromEntries(hashes) }
}

/** `pnpm run check:sri` - the committed hashes have to match what the CDN serves today. */
async function check(): Promise<void> {
  if (!existsSync(dataFile)) {
    throw new Error('check:sri: shared/data/sri.json is missing - run `pnpm run generate-sri` and commit the result')
  }

  const committed: SriData = JSON.parse(readFileSync(dataFile, 'utf8'))

  // The version pull request changesets opens bumps core/package.json before anything is on npm.
  // There is nothing to compare against yet, and the hashes get regenerated after the release, so
  // this is a pass rather than a failure.
  if (!(await isPublished())) {
    console.log(`check:sri: @tabler/core v${site.version} is not published yet, nothing to compare`)
    return
  }

  const current = await collectHashes()
  const problems: string[] = []

  if (committed.version !== current.version) {
    problems.push(`version: ${committed.version} committed, ${current.version} in @tabler/core`)
  }

  for (const file of files) {
    if (committed.files[file] !== current.files[file]) {
      problems.push(`${file}: ${committed.files[file] ?? 'missing'} committed, ${current.files[file]} on the CDN`)
    }
  }

  if (problems.length > 0) {
    console.error(`check:sri: shared/data/sri.json is out of date, run \`pnpm run generate-sri\`:\n  ${problems.join('\n  ')}`)
    process.exitCode = 1
    return
  }

  console.log(`check:sri: ${files.length} hashes match @tabler/core v${current.version}`)
}

/**
 * `--wait`, used by the release workflow: `changeset publish` returns before npm and the CDN have
 * the new version everywhere, so poll instead of failing on the first 404.
 */
async function collectWhenPublished(): Promise<SriData> {
  const deadline = Date.now() + waitMinutes * 60_000

  for (let attempt = 1; ; attempt++) {
    try {
      if (await isPublished()) {
        return await collectHashes()
      }
    } catch (error: unknown) {
      if (Date.now() >= deadline) {
        throw error
      }
    }

    if (Date.now() >= deadline) {
      throw new Error(`generate-sri: @tabler/core v${site.version} did not show up on the CDN within ${waitMinutes} minutes`)
    }

    console.log(`generate-sri: waiting for @tabler/core v${site.version} on the CDN (attempt ${attempt})`)
    await new Promise((resolve) => setTimeout(resolve, 15_000))
  }
}

async function generate(wait: boolean): Promise<void> {
  if (!wait && !(await isPublished())) {
    throw new Error(`generate-sri: @tabler/core v${site.version} is not on npm yet - run this after \`changeset publish\``)
  }

  const data = wait ? await collectWhenPublished() : await collectHashes()

  writeFileSync(dataFile, `${JSON.stringify(data, null, 2)}\n`)

  console.log(`generate-sri: wrote ${files.length} ${algorithm} hashes for @tabler/core v${data.version}`)
}

// Wrapped in main() because the root package is CJS (no top-level await).
const main = async () => {
  const args = process.argv.slice(2)

  await (args.includes('check') ? check() : generate(args.includes('--wait')))
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
