#!/usr/bin/env node
// Serves the built screenshots/dist via `astro preview` and captures a light
// and dark (?theme=dark) PNG — at 1x and @2x — of every page's #screenshot
// canvas (the full 1024x768 frame — logo, gradient backdrop and fake cursor
// included, not just the cropped component card).
// Run via `pnpm run capture` (builds first) — pass slugs as args to capture
// only specific pages, e.g. `pnpm run capture button badge`.
import { chromium, type Page } from 'playwright'
import { spawn, type ChildProcess } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const distDir = path.join(root, 'dist')
const outDir = path.join(root, 'captures')

const PORT = Number(process.env.CAPTURE_PORT ?? 4020)
const baseUrl = `http://localhost:${PORT}`

function discoverSlugs(): string[] {
  if (!existsSync(distDir)) {
    console.error(`No build found at ${path.relative(process.cwd(), distDir)} — run \`astro build\` first (or use \`pnpm run capture\`).`)
    process.exit(1)
  }

  const filter = process.argv.slice(2)
  return readdirSync(distDir)
    .filter((file) => file.endsWith('.html') && file !== 'index.html')
    .map((file) => file.replace(/\.html$/, ''))
    .filter((slug) => filter.length === 0 || filter.includes(slug))
    .sort()
}

// Spawns the `astro` binary directly (not via `pnpm exec astro`) so `child.pid`
// is the actual server process — killing a `pnpm exec` wrapper doesn't reliably
// kill the process it launches, which is how earlier runs left zombie preview
// servers squatting on the port for subsequent runs to collide with.
const astroBin = path.join(root, 'node_modules/.bin/astro')

function startPreviewServer(): Promise<ChildProcess> {
  return new Promise((resolve, reject) => {
    const child = spawn(astroBin, ['preview', '--port', String(PORT)], {
      cwd: root,
      stdio: ['ignore', 'pipe', 'pipe'],
    })

    const timer = setTimeout(() => reject(new Error(`astro preview didn't come up on port ${PORT} within 20s`)), 20_000)

    const onData = (data: Buffer) => {
      if (data.toString().includes('Local')) {
        clearTimeout(timer)
        child.stdout?.off('data', onData)
        resolve(child)
      }
    }
    child.stdout?.on('data', onData)
    child.stderr?.on('data', (data) => process.stderr.write(data))
    child.once('error', reject)
    child.once('exit', (code) => {
      if (code !== null && code !== 0) reject(new Error(`astro preview exited with code ${code}`))
    })
  })
}

function filenameFor(slug: string, theme: 'light' | 'dark', scale: 1 | 2): string {
  const themeSuffix = theme === 'dark' ? '-dark' : ''
  const scaleSuffix = scale === 2 ? '@2x' : ''
  return `${slug}${themeSuffix}${scaleSuffix}.png`
}

async function captureOne(page: Page, slug: string, theme: 'light' | 'dark', scale: 1 | 2) {
  await page.goto(`${baseUrl}/${slug}?theme=${theme}`, { waitUntil: 'load' })
  await page.waitForFunction(() => document.documentElement.dataset.screenshotReady === 'true', { timeout: 15_000 })

  const filename = filenameFor(slug, theme, scale)
  await page.locator('#screenshot').screenshot({ path: path.join(outDir, filename) })
  console.log(`  ✓ ${filename}`)
}

async function main() {
  const slugs = discoverSlugs()
  if (slugs.length === 0) {
    console.error('No matching pages found to capture.')
    process.exit(1)
  }

  mkdirSync(outDir, { recursive: true })

  console.log(`Starting preview server on port ${PORT}…`)
  const server = await startPreviewServer()
  // Interrupting the script (Ctrl+C) must not leave the preview server behind
  // squatting on the port for the next run to collide with.
  const killServer = () => server.kill()
  process.once('SIGINT', killServer)
  process.once('SIGTERM', killServer)

  try {
    const browser = await chromium.launch()
    const viewport = { width: 1280, height: 800 }
    // Two pages, not one reused with setViewportSize — deviceScaleFactor is
    // fixed at context/page creation and can't be changed on an existing page.
    const page1x = await browser.newPage({ viewport, deviceScaleFactor: 1 })
    const page2x = await browser.newPage({ viewport, deviceScaleFactor: 2 })

    for (const slug of slugs) {
      console.log(slug)
      await captureOne(page1x, slug, 'light', 1)
      await captureOne(page1x, slug, 'dark', 1)
      await captureOne(page2x, slug, 'light', 2)
      await captureOne(page2x, slug, 'dark', 2)
    }

    await browser.close()
    console.log(`\n${slugs.length * 4} screenshots written to ${path.relative(process.cwd(), outDir)}/`)
  } finally {
    server.kill()
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
