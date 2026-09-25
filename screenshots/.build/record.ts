// Records a short video of a screenshots page: `pnpm run record button`.
//
// Serves the built screenshots/dist via `astro preview` (like capture.ts),
// opens <slug>?motion (the layout keeps transitions and animations under that
// flag), plays the steps from steps/<slug>.json with a fake cursor, and grabs
// the frames through the DevTools screencast. The viewport is the canvas
// itself, zoomed to @2x, so a frame is the picture and nothing else. Frames
// come only when pixels change, so they are resampled to a constant frame rate
// and piped as MJPEG into Playwright's bundled ffmpeg, which writes a WebM
// (VP8). A system ffmpeg, when present, also writes an MP4 and a GIF.
//
// Steps: { "move": selector, "duration"?: ms } glides the cursor to the element
// (the duration follows the distance when left out),
// { "click": selector } moves there and clicks, { "click": true } clicks where the
// cursor is, { "wait": ms } holds.

import { chromium, type CDPSession, type Page } from 'playwright'
import { execFileSync, spawn } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const distDir = path.join(root, 'dist')
const stepsDir = path.join(root, 'steps')
const outDir = path.join(root, 'captures')

const PORT = Number(process.env.CAPTURE_PORT ?? 4021)
const baseUrl = `http://localhost:${PORT}`
const FPS = 30
const SCALE = 2

type Step = { move: string; duration?: number } | { click: string | true } | { wait: number }

type Frame = { data: Buffer; time: number }

type Point = { x: number; y: number }

type RecordWindow = Window & { __recordMove: (from: Point, to: Point, ms: number) => Promise<void> }

// Runs in the page. Kept as text: tsx wraps named functions passed to
// page.evaluate() in its own helper, which does not exist in the browser.
const cursorScript = (scale: number) => `
  window.__recordMove = (from, to, ms) => new Promise((resolve) => {
    const el = document.getElementById('record-cursor')
    // control point off the straight line, so the path bends like a hand would
    const dx = to.x - from.x
    const dy = to.y - from.y
    const len = Math.hypot(dx, dy) || 1
    const bend = Math.min(0.18 * len, 60) * (dx >= 0 ? 1 : -1)
    const cx = (from.x + to.x) / 2 - (dy / len) * bend
    const cy = (from.y + to.y) / 2 + (dx / len) * bend
    const start = performance.now()
    const frame = (now) => {
      const t = ms > 0 ? Math.min(1, (now - start) / ms) : 1
      const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
      const x = (1 - e) * (1 - e) * from.x + 2 * (1 - e) * e * cx + e * e * to.x
      const y = (1 - e) * (1 - e) * from.y + 2 * (1 - e) * e * cy + e * e * to.y
      el.dataset.x = String(x)
      el.dataset.y = String(y)
      // viewport px → CSS px of the zoomed document
      el.style.transform = 'translate(' + (x / ${scale} - 2) + 'px, ' + (y / ${scale} - 2) + 'px)'
      if (t < 1) requestAnimationFrame(frame)
      else resolve()
    }
    frame(start)
  })
`

function discoverSlugs(): string[] {
  if (!existsSync(distDir)) {
    console.error(`No build found at ${path.relative(process.cwd(), distDir)} — run \`astro build\` first (or use \`pnpm run record\`).`)
    process.exit(1)
  }

  const filter = process.argv.slice(2)
  return readdirSync(stepsDir)
    .filter((file) => file.endsWith('.json'))
    .map((file) => file.replace(/\.json$/, ''))
    .filter((slug) => filter.length === 0 || filter.includes(slug))
    .sort()
}

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

// Playwright ships its own ffmpeg for video recording; it encodes VP8/WebM only.
function bundledFfmpeg(): string {
  const cache = process.env.PLAYWRIGHT_BROWSERS_PATH ?? path.join(os.homedir(), process.platform === 'darwin' ? 'Library/Caches/ms-playwright' : '.cache/ms-playwright')
  const dir = readdirSync(cache)
    .filter((name) => name.startsWith('ffmpeg-'))
    .sort()
    .at(-1)
  if (!dir) throw new Error(`No ffmpeg in ${cache} — run \`npx playwright install ffmpeg\``)
  const bin = readdirSync(path.join(cache, dir)).find((name) => name.startsWith('ffmpeg-') && !name.includes('.'))
  if (!bin) throw new Error(`No ffmpeg binary in ${path.join(cache, dir)}`)
  return path.join(cache, dir, bin)
}

function systemFfmpeg(): string | undefined {
  try {
    return (
      execFileSync(process.platform === 'win32' ? 'where' : 'which', ['ffmpeg'], { encoding: 'utf8' })
        .trim()
        .split('\n')[0] || undefined
    )
  } catch {
    return undefined
  }
}

// Frames arrive whenever the screen changes; the video needs one every 1/FPS s.
function resample(frames: Frame[], end: number): Buffer[] {
  const out: Buffer[] = []
  let index = 0
  for (let t = frames[0]!.time; t <= end; t += 1 / FPS) {
    while (index + 1 < frames.length && frames[index + 1]!.time <= t) index++
    out.push(frames[index]!.data)
  }
  return out
}

function encode(ffmpeg: string, frames: Buffer[], args: string[], output: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(ffmpeg, ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-c:v', 'mjpeg', '-framerate', String(FPS), '-i', 'pipe:0', ...args, output], { stdio: ['pipe', 'inherit', 'inherit'] })
    child.once('error', reject)
    child.stdin.on('error', reject)
    child.once('exit', (code) => (code === 0 ? resolve() : reject(new Error(`ffmpeg exited with code ${code} for ${output}`))))
    for (const frame of frames) child.stdin.write(frame)
    child.stdin.end()
  })
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

async function centerOf(page: Page, selector: string): Promise<{ x: number; y: number }> {
  const box = await page.locator(selector).first().boundingBox()
  if (!box) throw new Error(`${selector} is not visible`)
  return { x: box.x + box.width / 2, y: box.y + box.height / 2 }
}

// The fake cursor from the layout. The page animates it on requestAnimationFrame
// — a slight arc, ease-in-out, a duration that grows with the distance — so the
// motion is as smooth as the screencast frame rate. The real mouse follows it a
// few times a second so :hover styles apply along the way.
async function moveCursor(page: Page, to: { x: number; y: number }, duration?: number): Promise<void> {
  const from = await page.evaluate(() => {
    const el = document.getElementById('record-cursor')!
    return { x: Number(el.dataset.x), y: Number(el.dataset.y) }
  })
  const distance = Math.hypot(to.x - from.x, to.y - from.y)
  const ms = duration ?? Math.round(320 + Math.sqrt(distance) * 22)

  const animation = page.evaluate(([from, to, ms]) => (window as unknown as RecordWindow).__recordMove(from, to, ms), [from, to, ms] as const)

  // the real pointer trails the sprite, so hover states light up on the way
  let done = false
  const follow = (async () => {
    while (!done) {
      const at = await page.evaluate(() => {
        const el = document.getElementById('record-cursor')!
        return { x: Number(el.dataset.x), y: Number(el.dataset.y) }
      })
      await page.mouse.move(at.x, at.y)
      await sleep(50)
    }
  })()
  await animation
  done = true
  await follow
  await page.mouse.move(to.x, to.y)
}

// A click: the sprite dips for a moment, the button is held for a beat. With
// no target it lands where the cursor already is, after a `move`.
async function clickAt(page: Page, to?: { x: number; y: number }): Promise<void> {
  if (to) await moveCursor(page, to)
  await sleep(120)
  await page.evaluate(() => (document.querySelector<HTMLElement>('#record-cursor .cursor')!.style.scale = '0.88'))
  await page.mouse.down()
  await sleep(110)
  await page.evaluate(() => (document.querySelector<HTMLElement>('#record-cursor .cursor')!.style.scale = '1'))
  await page.mouse.up()
}

async function play(page: Page, steps: Step[]): Promise<void> {
  for (const step of steps) {
    if ('move' in step) {
      await moveCursor(page, await centerOf(page, step.move), step.duration)
    } else if ('click' in step) {
      await clickAt(page, step.click === true ? undefined : await centerOf(page, step.click))
    } else {
      await sleep(step.wait)
    }
  }
}

async function recordOne(page: Page, client: CDPSession, slug: string, theme: 'light' | 'dark'): Promise<Frame[]> {
  await page.goto(`${baseUrl}/${slug}?theme=${theme}&motion`, { waitUntil: 'load' })
  await page.waitForFunction(() => document.documentElement.dataset.screenshotReady === 'true', { timeout: 15_000 })

  // The canvas has to fill the viewport exactly, so a screencast frame is the
  // picture: pin it to the corner and size the viewport to it. Screencast
  // frames come in CSS pixels whatever the device scale factor, so the @2x
  // rendering is a CSS zoom of the whole document in a viewport twice the size.
  const size = await page.locator('#screenshot').boundingBox()
  if (!size) throw new Error('#screenshot not found')
  const width = Math.round(size.width) * SCALE
  const height = Math.round(size.height) * SCALE
  await page.addStyleTag({ content: '#screenshot { position: fixed !important; inset-inline-start: 0 !important; top: 0 !important; margin: 0 !important; } [data-screenshot-chrome] { display: none !important; }' })
  await page.setViewportSize({ width, height })
  await page.evaluate((scale) => (document.documentElement.style.zoom = String(scale)), SCALE)
  const box = await page.locator('#screenshot').boundingBox()
  if (!box || Math.round(box.x) !== 0 || Math.round(box.y) !== 0 || Math.round(box.width) !== width) {
    throw new Error(`#screenshot is not at 0,0 ${width}x${height} (got ${JSON.stringify(box)})`)
  }

  // The layout's .cursor sprite, parked below the frame until the first move.
  await page.evaluate(
    ([w, h]) => {
      // outer element carries the position, the sprite inside only the press dip —
      // a `scale` on the same element would scale the translation with it
      const el = document.createElement('div')
      el.id = 'record-cursor'
      el.style.cssText = 'position: absolute; top: 0; left: 0; z-index: 10000; pointer-events: none'
      const sprite = document.createElement('div')
      sprite.className = 'cursor'
      sprite.style.cssText = 'position: static; transform-origin: 4px 2px'
      el.append(sprite)
      document.getElementById('screenshot')!.append(el)
      el.dataset.x = String(w / 2)
      el.dataset.y = String(h + 40)
    },
    [width, height],
  )
  await page.addScriptTag({ content: cursorScript(SCALE) })
  await moveCursor(page, { x: width / 2, y: height + 40 }, 0)

  const frames: Frame[] = []
  const onFrame = async (event: { data: string; sessionId: number }) => {
    frames.push({ data: Buffer.from(event.data, 'base64'), time: Date.now() / 1000 })
    await client.send('Page.screencastFrameAck', { sessionId: event.sessionId }).catch(() => {})
  }
  client.on('Page.screencastFrame', onFrame)
  await client.send('Page.startScreencast', { format: 'jpeg', quality: 92, maxWidth: width, maxHeight: height, everyNthFrame: 1 })

  const steps = JSON.parse(readFileSync(path.join(stepsDir, `${slug}.json`), 'utf8')) as Step[]
  await play(page, steps)
  // Let the last change land before the screencast stops.
  await sleep(200)
  const end = Date.now() / 1000

  await client.send('Page.stopScreencast')
  client.off('Page.screencastFrame', onFrame)

  if (frames.length === 0) throw new Error('no frames captured')
  // Hold the last frame until the end mark, so the video does not cut on the last change.
  return [...frames, { data: frames.at(-1)!.data, time: end }]
}

async function main() {
  const slugs = discoverSlugs()
  if (slugs.length === 0) {
    console.error('No matching steps found in steps/.')
    process.exit(1)
  }

  mkdirSync(outDir, { recursive: true })
  const bundled = bundledFfmpeg()
  const system = systemFfmpeg()

  console.log(`Starting preview server on port ${PORT}…`)
  await startPreviewServer()
  process.once('SIGINT', stopPreviewServer)
  process.once('SIGTERM', stopPreviewServer)

  try {
    const browser = await chromium.launch()
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } })
    const page = await context.newPage()
    const client = await context.newCDPSession(page)

    for (const slug of slugs) {
      for (const theme of ['light', 'dark'] as const) {
        console.log(`${slug} (${theme})`)
        const frames = await recordOne(page, client, slug, theme)
        const sampled = resample(frames, frames.at(-1)!.time)
        const name = `${slug}${theme === 'dark' ? '-dark' : ''}`

        // RECORD_FRAMES="0.5,2,4" also writes those seconds as JPEG stills, for a quick look without a player.
        for (const second of (process.env.RECORD_FRAMES ?? '').split(',').filter(Boolean).map(Number)) {
          const frame = sampled[Math.min(sampled.length - 1, Math.round(second * FPS))]!
          writeFileSync(path.join(outDir, `${name}-${second}s.jpg`), frame)
        }

        await encode(bundled, sampled, ['-c:v', 'libvpx', '-b:v', '6M', '-pix_fmt', 'yuv420p', '-auto-alt-ref', '0'], path.join(outDir, `${name}.webm`))
        console.log(`  ✓ ${name}.webm (${sampled.length} frames, ${(sampled.length / FPS).toFixed(1)} s)`)

        if (system) {
          await encode(system, sampled, ['-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart'], path.join(outDir, `${name}.mp4`))
          await encode(system, sampled, ['-vf', `fps=${FPS},scale=iw/2:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=128[p];[s1][p]paletteuse=dither=sierra2_4a`, '-loop', '0'], path.join(outDir, `${name}.gif`))
          console.log(`  ✓ ${name}.mp4, ${name}.gif`)
        }
      }
    }

    await browser.close()
    if (!system) console.log('\nOnly WebM was written: install ffmpeg (brew install ffmpeg) to get MP4 and GIF too.')
  } finally {
    await stopPreviewServer()
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
