#!/usr/bin/env node
// Regenerates skills/<name>/SKILL.md, the public agent skills a user installs with
// `npx skills add tabler/tabler` (skills.sh). The source of each skill is
// docs/lib/agent-skills/<name>/SKILL.md, the file the docs also publish under
// /.well-known/agent-skills/. That source holds `${site.*}` tokens so it quotes the same urls and
// cdn version as the rest of the docs; the copy in skills/ has them resolved, because the skills
// CLI serves the file straight from the repository, with no build step in between.
//
//      pnpm run generate:agent-skills    (after editing a source skill; `pnpm run version` and
//                                         `release:main` run it on their own)
//      pnpm run check:agent-skills       (the committed copies still match the sources)
//
// The tokens are resolved the same way docs/lib/agent-skills.ts does it. That module imports the
// skill through vite (`?raw`) and the docs path aliases, so it cannot run under tsx; the few lines
// of cdn-snippet logic are repeated here instead. `check` also compares against the built docs
// output when docs/dist exists and is newer than everything that goes into it, so the two cannot
// drift apart unnoticed; a build from before a release or a source edit proves nothing and is skipped.
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { site } from '../shared/lib/site'

interface SriData {
  version: string
  files: Record<string, string>
}

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(__dirname, '..')
const sourceDir = join(repoRoot, 'docs/lib/agent-skills')
const outputDir = join(repoRoot, 'skills')
const docsDist = join(repoRoot, 'docs/dist/.well-known/agent-skills')

// Everything the built docs copy depends on. A docs/dist older than any of these is stale.
const buildInputs = ['shared/data/sri.json', 'shared/lib/site.ts', 'core/package.json', 'docs/lib/agent-skills.ts', 'docs/lib/cdn-snippets.ts'].map((file) => join(repoRoot, file))

const sri: SriData = JSON.parse(readFileSync(join(repoRoot, 'shared/data/sri.json'), 'utf8'))

// Same rules as docs/lib/cdn-snippets.ts: the SRI attributes only when the hashes are for the
// current version, otherwise the tags go out without them.
const sriAttrs = (file: string): string => {
  const hash = sri.version === site.version ? sri.files[file] : undefined

  return hash ? ` integrity="${hash}" crossorigin="anonymous"` : ''
}

const cdnLinkTag = (file: string): string => `<link rel="stylesheet" href="${site.cdnUrl}/${file}"${sriAttrs(file)} />`
const cdnScriptTag = (file: string): string => `<script src="${site.cdnUrl}/${file}"${sriAttrs(file)}></script>`
const cdnPackageSnippet = (): string => `${cdnLinkTag('dist/css/tabler.min.css')}\n${cdnScriptTag('dist/js/tabler.min.js')}`

const tokens: Record<string, string> = {
  '${site.docsUrl}': site.docsUrl,
  '${site.cdnUrl}': site.cdnUrl,
  '${site.previewUrl}': site.previewUrl,
  '${cdnPackageSnippet()}': cdnPackageSnippet(),
}

const resolveTokens = (text: string): string => Object.entries(tokens).reduce((result, [token, value]) => result.replaceAll(token, value), text)

/** The skill names: one directory per skill under docs/lib/agent-skills/, each with a SKILL.md. */
const skillNames = (): string[] =>
  readdirSync(sourceDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && existsSync(join(sourceDir, entry.name, 'SKILL.md')))
    .map((entry) => entry.name)
    .sort()

const resolveSkill = (name: string): string => {
  const content = resolveTokens(readFileSync(join(sourceDir, name, 'SKILL.md'), 'utf8'))
  const unresolved = content.match(/\$\{[^}]+\}/g)

  if (unresolved) {
    throw new Error(`agent-skills: ${name}/SKILL.md uses tokens this script does not know: ${[...new Set(unresolved)].join(', ')}`)
  }

  return content
}

const mtime = (file: string): number => statSync(file).mtimeMs

/** The built copy is worth comparing only when it is newer than every file it was made from. */
const isCurrentBuild = (builtFile: string, name: string): boolean => {
  const built = mtime(builtFile)
  const stale = [...buildInputs, join(sourceDir, name, 'SKILL.md')].filter((file) => existsSync(file) && mtime(file) > built)

  if (stale.length > 0) {
    console.log(`check:agent-skills: skipping the docs build comparison for ${name}, docs/dist is older than ${stale.map((file) => file.slice(repoRoot.length + 1)).join(', ')}`)
  }

  return stale.length === 0
}

/** `pnpm run check:agent-skills` - every committed copy has to match its source. */
function check(): void {
  const problems: string[] = []

  for (const name of skillNames()) {
    const expected = resolveSkill(name)
    const outputFile = join(outputDir, name, 'SKILL.md')

    if (!existsSync(outputFile)) {
      problems.push(`skills/${name}/SKILL.md is missing`)
      continue
    }

    if (readFileSync(outputFile, 'utf8') !== expected) {
      problems.push(`skills/${name}/SKILL.md does not match docs/lib/agent-skills/${name}/SKILL.md`)
    }

    // The docs render the same source through docs/lib/agent-skills.ts. When a docs build is at
    // hand, the two outputs have to be identical, or the token logic here has drifted from the docs.
    const builtFile = join(docsDist, name, 'SKILL.md')

    if (existsSync(builtFile) && isCurrentBuild(builtFile, name) && readFileSync(builtFile, 'utf8') !== expected) {
      problems.push(`skills/${name}/SKILL.md differs from the docs build at docs/dist/.well-known/agent-skills/${name}/SKILL.md - the token logic in .build/generate-agent-skills.ts and docs/lib/agent-skills.ts has drifted`)
    }
  }

  if (problems.length > 0) {
    console.error(`check:agent-skills: out of date, run \`pnpm run generate:agent-skills\`:\n  ${problems.join('\n  ')}`)
    process.exitCode = 1
    return
  }

  console.log(`check:agent-skills: ${skillNames().length} skill(s) match their sources (@tabler/core v${site.version})`)
}

function generate(): void {
  for (const name of skillNames()) {
    const outputFile = join(outputDir, name, 'SKILL.md')

    mkdirSync(dirname(outputFile), { recursive: true })
    writeFileSync(outputFile, resolveSkill(name))

    console.log(`generate:agent-skills: wrote skills/${name}/SKILL.md (@tabler/core v${site.version})`)
  }
}

const main = () => {
  const args = process.argv.slice(2)

  if (args.includes('check')) {
    check()
  } else {
    generate()
  }
}

try {
  main()
} catch (error: unknown) {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
}
