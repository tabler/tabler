// Runs a project written for the last release against that release and against
// the working tree, and fails when the two disagree.
//
// `check-compat` compares names: it knows that `--tblr-primary-rgb` still
// exists, not that `rgba(var(--tblr-primary-rgb), 0.5)` still paints. This check
// covers behaviour: the project in `.build/compat-fixture/` compiles its Sass
// with 1.5 variables and helpers, and its page uses 1.5 markup, the libraries in
// `dist/libs` and the old JavaScript helpers. Every assertion has to give the
// same answer on both packages.
//
// The release is checked too, on purpose: an assertion that fails there is a
// mistake in the fixture, not a break, and would otherwise hide one.
//
// Needs `core/dist`, so run it after the core build.
//
// Usage: tsx .build/check-compat-fixture.ts [--package <dir>]
//
// `--package` points at another unpacked or built `@tabler/core` instead of
// `core/`, for example an older checkout. Without a `dist/` in it only the Sass
// half runs.
import { createReadStream, existsSync, statSync } from 'node:fs'
import { createServer, type Server } from 'node:http'
import { extname, join, resolve } from 'node:path'
import { chromium, type Page } from 'playwright'
import { compile as compileSass } from 'sass'
import { pkgName, releasedPackage } from './released-package'

const fixtureDir = '.build/compat-fixture'
const packageArg = process.argv.indexOf('--package')
const coreDir = packageArg > -1 ? process.argv[packageArg + 1]! : 'core'

const MIME: Record<string, string> = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.map': 'application/json' }

type Result = Record<string, string>

// --- sass ------------------------------------------------------------------

function sassResults(pkg: string): Result {
  const results: Result = {}
  try {
    const { css } = compileSass(join(fixtureDir, 'project.scss'), { loadPaths: [pkg, 'node_modules'], style: 'expanded', quietDeps: true, logger: { warn() {}, debug() {} } })
    results['sass: the project compiles'] = 'yes'

    const fixture = /\.fixture \{([^}]*)\}/.exec(css)?.[1] ?? ''
    const value = (name: string): string => new RegExp(`${name}:\\s*([^;]+);`).exec(fixture)?.[1]?.trim() ?? '(missing)'
    results['sass: $input-focus-width follows $input-btn-focus-width'] = value('--fixture-width')
    results['sass: $theme-colors-rgb has the primary colour'] = value('--fixture-has-rgb-map')
    results['sass: theme-color-darker() returns a colour'] = /^(#|rgb|oklch|color)/.test(value('color')) ? 'yes' : value('color')
    results['sass: theme-color-lighter() takes the $primary variable'] = /^(#|rgb|oklch|color)/.test(value('border-color')) ? 'yes' : value('border-color')
    results['sass: url-svg() builds a data uri'] = value('background-image').startsWith('url(') ? 'yes' : value('background-image')
    results['sass: varify() wraps names in var()'] = value('transition-property')
    results['sass: media-breakpoint-down-than(md) emits a media query'] = /@media \(max-width: 575\.98px\)\s*\{\s*\.fixture/.test(css) ? 'yes' : 'no'
    results['sass: focus-ring($show-border: true) emits a focus style'] = /\.fixture:focus \{[^}]*(outline|box-shadow)/.test(css) ? 'yes' : 'no'
  } catch (error) {
    results['sass: the project compiles'] = `no — ${String((error as Error).message).split('\n')[0]}`
  }
  return results
}

// --- page ------------------------------------------------------------------

function serve(pkg: string): Promise<Server> {
  const server = createServer((request, response) => {
    const path = decodeURIComponent((request.url ?? '/').split('?')[0]!)
    const file = path === '/' ? resolve(fixtureDir, 'page.html') : resolve(pkg, `.${path}`)
    if (!existsSync(file) || !statSync(file).isFile()) {
      response.writeHead(404).end()
      return
    }
    response.writeHead(200, { 'content-type': MIME[extname(file)] ?? 'application/octet-stream' })
    createReadStream(file).pipe(response)
  })
  return new Promise((done) => server.listen(0, '127.0.0.1', () => done(server)))
}

async function pageResults(pkg: string, page: Page): Promise<Result> {
  const results: Result = {}
  const problems: string[] = []
  page.on('pageerror', (error) => problems.push(error.message))
  page.on('response', (response) => {
    if (response.status() >= 400) problems.push(`${response.status()} ${new URL(response.url()).pathname}`)
  })

  const server = await serve(pkg)
  const { port } = server.address() as { port: number }
  await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle' })
  await page.addStyleTag({ content: '*, *::before, *::after { transition: none !important; }' })

  const style = (selector: string, property: string): Promise<string> => page.evaluate(([s, p]) => getComputedStyle(document.querySelector(s!)!).getPropertyValue(p!), [selector, property])

  results['page: no script error and no 404'] = problems.length === 0 ? 'yes' : problems.join('; ')
  results['page: rgba(var(--tblr-primary-rgb), .5) paints'] = await style('#highlight', 'background-color')
  results['page: an empty .legend is a visible dot'] = (await page.evaluate(() => document.querySelector('#legend')!.getBoundingClientRect().width)) > 0 ? 'yes' : 'no'
  results['page: .form-hint is a block'] = await style('#hint', 'display')
  results['page: .form-hint sits below the control'] = (await page.evaluate(() => document.querySelector('#hint')!.getBoundingClientRect().top >= document.querySelector('#email')!.getBoundingClientRect().bottom)) ? 'yes' : 'no'

  await page.focus('#button')
  await page.keyboard.press('Shift+Tab')
  await page.keyboard.press('Tab')
  results['page: --tblr-btn-focus-box-shadow is drawn on focus'] = (await style('#button', 'box-shadow')).includes('rgb(255, 0, 0)') ? 'yes' : await style('#button', 'box-shadow')

  results['page: window.tabler.Modal exists'] = await page.evaluate(() => typeof (window as any).tabler?.Modal)
  results['page: tabler.tabler.prefix'] = await page.evaluate(() => String((window as any).fixture?.prefix))
  results['page: tabler.tabler.getColor() returns a colour'] = (await page.evaluate(() => Boolean((window as any).fixture?.color))) ? 'yes' : 'no'
  results['page: tabler.tabler.getColor(name, 0.5) returns a colour'] = (await page.evaluate(() => Boolean((window as any).fixture?.colorHalf))) ? 'yes' : 'no'

  for (const name of ['autosize', 'countUp', 'ClipboardJS', 'Litepicker']) {
    results[`page: dist/libs provides window.${name}`] = await page.evaluate((n) => typeof (window as any)[n] !== 'undefined', name).then((ok) => (ok ? 'yes' : 'no'))
  }
  results['page: Litepicker renders with Tabler styles'] = (await page.evaluate(() => {
    const picker = document.querySelector('.litepicker')
    return picker ? getComputedStyle(picker).getPropertyValue('--litepicker-day-color').trim() !== '' : false
  }))
    ? 'yes'
    : 'no'

  await page.fill('#message', 'one\ntwo\nthree\nfour\nfive\nsix')
  await page.dispatchEvent('#message', 'input')
  results['page: data-bs-toggle="autosize" grows the textarea'] = (await page.evaluate(() => (document.querySelector('#message') as HTMLElement).offsetHeight)) > 60 ? 'yes' : 'no'

  await page.waitForTimeout(600)
  results['page: data-countup ends on the number'] = (await page.textContent('#total'))?.replace(/\D/g, '') ?? ''

  await page.click('#open-modal')
  await page.waitForTimeout(100)
  results['page: data-bs-toggle="modal" opens the modal'] = (await page.evaluate(() => document.querySelector('#modal')!.classList.contains('show'))) ? 'yes' : 'no'

  server.close()
  return results
}

// --- main ------------------------------------------------------------------

async function main() {
  const hasDist = existsSync(join(coreDir, 'dist/css/tabler.css'))
  if (!hasDist && packageArg === -1) {
    throw new Error('core/dist is missing — build core first: pnpm --filter @tabler/core build')
  }

  const { dir: released, version } = await releasedPackage()
  const browser = await chromium.launch()
  const run = async (pkg: string): Promise<Result> => {
    const page = await browser.newPage()
    const results = { ...sassResults(pkg), ...(hasDist ? await pageResults(pkg, page) : {}) }
    await page.close()
    return results
  }
  const before = await run(released)
  const after = await run(coreDir)
  await browser.close()

  const failed: string[] = []
  for (const [name, expected] of Object.entries(before)) {
    const actual = after[name] ?? '(not run)'
    const ok = actual === expected
    console.log(`${ok ? '✓' : '✗'} ${name}${ok ? '' : `\n    ${pkgName}@${version}: ${expected}\n    working tree: ${actual}`}`)
    if (!ok) failed.push(name)
  }

  // The fixture is only worth something if the release passes it.
  const broken = Object.entries(before).filter(([, value]) => value.startsWith('no') || value === '(missing)' || value === 'undefined')
  for (const [name, value] of broken) console.error(`\n! ${name} fails on ${pkgName}@${version} itself (${value}) — fix the fixture.`)

  if (failed.length > 0) console.error(`\n${failed.length} of ${Object.keys(before).length} checks behave differently from ${pkgName}@${version}. See the backward-compat skill.`)
  if (failed.length > 0 || broken.length > 0) process.exit(1)
  console.log(`\nOK — a ${version} project compiles and behaves the same on the working tree (${Object.keys(before).length} checks).`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
