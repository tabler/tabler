// Fails when a rendered page uses a class that no shipped stylesheet defines.
//
// A typo in a class name (`ml-auto`, `progress-xs`) renders as nothing: no
// error, no warning, just markup that silently does not do what it says — and
// it ends up in the html people copy from the preview. This scans the class
// attributes of every page from a site's sitemap and looks each class up in
// the css of the given directories.
//
// Classes that exist only as JavaScript or demo hooks are listed in
// markup-classes-baseline.txt. Anything not on that list fails the check; so
// does a name on the list that no longer appears, which keeps the file from
// going stale — delete the line when you drop the hook.
//
// Run: pnpm run check-markup-classes --html preview/dist --css core/dist/css --css core/dist/libs
//      Targets can be a built directory or a running server (http://localhost:3000).
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const BASELINE = resolve(__dirname, 'markup-classes-baseline.txt')

const args = process.argv.slice(2)
const htmlTargets: string[] = []
const cssDirs: string[] = []
let updateBaseline = false
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--html') htmlTargets.push(args[++i]!)
  else if (args[i] === '--css') cssDirs.push(args[++i]!)
  else if (args[i] === '--update-baseline') updateBaseline = true
}
if (htmlTargets.length === 0 || cssDirs.length === 0) {
  console.error('Usage: tsx .build/check-markup-classes.ts --html <dist-dir|url> [--html …] --css <dir> [--css …] [--update-baseline]')
  process.exit(2)
}

const walk = (dir: string, ext: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? walk(path, ext) : path.endsWith(ext) ? [path] : []
  })

const defined = new Set<string>()
for (const dir of cssDirs) {
  for (const file of walk(resolve(dir), '.css')) {
    for (const m of readFileSync(file, 'utf8').matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)) defined.add(m[1]!)
  }
}

const pagesOf = async (target: string): Promise<{ path: string; html: string }[]> => {
  if (/^https?:/.test(target)) {
    const xml = await (await fetch(`${target}/sitemap.xml`)).text()
    const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]!.replace(/^https?:\/\/[^/]+/, ''))
    const pages = []
    for (const path of paths) pages.push({ path, html: await (await fetch(target + path)).text() })
    return pages
  }
  const root = resolve(target)
  const xml = readFileSync(join(root, 'sitemap.xml'), 'utf8')
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => {
    const path = m[1]!.replace(/^https?:\/\/[^/]+/, '')
    const file = [join(root, path), join(root, `${path}.html`), join(root, path, 'index.html')].find((f) => existsSync(f) && statSync(f).isFile())
    return { path, html: file ? readFileSync(file, 'utf8') : '' }
  })
}

const main = async () => {
  const used = new Map<string, Set<string>>()
  let pageCount = 0
  for (const target of htmlTargets) {
    for (const { path, html } of await pagesOf(target)) {
      pageCount++
      // Page-level <style> blocks define classes too (demo pages style their own markup).
      const inline = new Set<string>()
      for (const block of html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)) for (const m of block[1]!.matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)) inline.add(m[1]!)
      for (const m of html.matchAll(/class="([^"]*)"/g)) {
        for (const cls of m[1]!.split(/\s+/).filter(Boolean)) {
          if (defined.has(cls) || inline.has(cls)) continue
          if (!used.has(cls)) used.set(cls, new Set())
          used.get(cls)!.add(`${target}${path}`)
        }
      }
    }
  }
  const baseline = new Set(
    existsSync(BASELINE)
      ? readFileSync(BASELINE, 'utf8')
          .split('\n')
          .map((l) => l.trim())
          .filter((l) => l && !l.startsWith('#'))
      : [],
  )
  if (updateBaseline) {
    const header = '# Classes used in the rendered html that no stylesheet defines on purpose:\n# JavaScript hooks and demo-only markers. One per line; delete a line when the hook goes.\n'
    writeFileSync(BASELINE, header + [...used.keys()].sort().join('\n') + '\n')
    console.log(`wrote ${used.size} classes to ${BASELINE}`)
    return
  }
  const unknown = [...used].filter(([cls]) => !baseline.has(cls)).sort((a, b) => b[1].size - a[1].size)
  const stale = [...baseline].filter((cls) => !used.has(cls))
  for (const [cls, pages] of unknown) console.log(`✗ .${cls} — not in any stylesheet, used on ${pages.size} page(s), e.g. ${[...pages][0]}`)
  for (const cls of stale) console.log(`✗ .${cls} — listed in ${BASELINE} but no longer used (delete the line)`)
  if (unknown.length || stale.length) {
    console.error(`\n${unknown.length} unknown class(es), ${stale.length} stale baseline entr(ies) — ${pageCount} pages, ${defined.size} defined classes`)
    process.exit(1)
  }
  console.log(`OK — ${pageCount} pages checked against ${defined.size} classes, ${baseline.size} known hooks`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
