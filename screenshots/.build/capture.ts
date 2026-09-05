#!/usr/bin/env node
// Serves the built screenshots/dist via `astro preview` and captures a light
// and dark (?theme=dark) PNG — at 1x and @2x — of every page's #screenshot
// canvas (the full 1024x768 frame — logo, gradient backdrop and fake cursor
// included, not just the cropped component card).
// Run via `pnpm run capture` (builds first) — pass slugs as args to capture
// only specific pages, e.g. `pnpm run capture button badge`.
import { chromium, type Page } from 'playwright'
import { spawn } from 'node:child_process'
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

// Spawns the `astro` binary directly (not via `pnpm exec astro`) so the CLI's
// own background handling is the only thing between us and the server.
// Astro detaches `preview` into a background daemon whenever stdout is not a
// TTY (which it never is here) and prints a JSON status line instead of the
// human "Local  http://…" banner, so readiness is polled over HTTP rather than
// scraped from stdout, and the server is stopped through `astro preview stop`
// rather than by killing the process we spawned — that one has already exited.
const astroBin = path.join(root, 'node_modules/.bin/astro')

function runAstro(args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(astroBin, args, { cwd: root, stdio: ['ignore', 'pipe', 'pipe'] })
    child.stderr?.on('data', (data) => process.stderr.write(data))
    child.once('error', reject)
    child.once('exit', (code) => {
      if (code === null || code === 0) resolve()
      else reject(new Error(`astro ${args.join(' ')} exited with code ${code}`))
    })
  })
}

async function startPreviewServer(): Promise<void> {
  await runAstro(['preview', '--background', '--port', String(PORT)])

  const deadline = Date.now() + 20_000
  while (Date.now() < deadline) {
    try {
      const response = await fetch(baseUrl, { method: 'HEAD' })
      if (response.ok || response.status === 404) return
    } catch {
      // not listening yet
    }
    await new Promise((resolve) => setTimeout(resolve, 250))
  }

  throw new Error(`astro preview didn't come up on port ${PORT} within 20s`)
}

const stopPreviewServer = () => runAstro(['preview', 'stop']).catch(() => {})

function filenameFor(slug: string, theme: 'light' | 'dark', scale: 1 | 2): string {
  const themeSuffix = theme === 'dark' ? '-dark' : ''
  const scaleSuffix = scale === 2 ? '@2x' : ''
  return `${slug}${themeSuffix}${scaleSuffix}.png`
}

async function captureOne(page: Page, slug: string, theme: 'light' | 'dark', scale: 1 | 2) {
  await page.goto(`${baseUrl}/${slug}?theme=${theme}`, { waitUntil: 'load' })
  await page.waitForFunction(() => document.documentElement.dataset.screenshotReady === 'true', { timeout: 15_000 })

  // Page furniture that exists for the human browsing the pages (the light/dark
  // toggle). The app frame fills the viewport, so anything left on screen would
  // sit inside the captured rectangle.
  await page.addStyleTag({ content: '[data-screenshot-chrome] { display: none !important; }' })

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
  await startPreviewServer()
  // Interrupting the script (Ctrl+C) must not leave the preview server behind
  // squatting on the port for the next run to collide with.
  process.once('SIGINT', stopPreviewServer)
  process.once('SIGTERM', stopPreviewServer)

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
    await stopPreviewServer()
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
