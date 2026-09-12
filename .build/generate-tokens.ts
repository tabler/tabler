#!/usr/bin/env node
// Generates shared/lib/tokens.ts from the core SCSS maps, so the TS
// unions used by components can never drift from the stylesheet source of
// truth. Values are read through the real Sass compiler (after every merge and
// !default), not by parsing the source text.
// Run: pnpm run generate-tokens        — (re)write the file
//      pnpm run check:tokens  — fail when the committed file is stale
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { compileString } from 'sass'
import { format, resolveConfig } from 'prettier'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(__dirname, '..')
const scssDir = join(repoRoot, 'core', 'scss')
const outFile = join(repoRoot, 'shared', 'lib', 'tokens.ts')
const mode = process.argv[2] === 'check' ? 'check' : 'generate'

// One entry per generated const/type; `source` is the Sass member the keys come
// from — `kind: 'map'` reads map.keys(), `kind: 'list'` reads the list itself.
const TOKENS = [
  { name: 'themeColors', type: 'ThemeColor', module: 'v', variable: '$theme-colors', kind: 'map', source: 'core/scss/_variables.scss' },
  { name: 'socialColors', type: 'SocialColor', module: 'v', variable: '$social-colors', kind: 'map', source: 'core/scss/_variables.scss' },
  { name: 'avatarSizes', type: 'AvatarSize', module: 'v', variable: '$avatar-sizes', kind: 'map', source: 'core/scss/_variables.scss' },
  { name: 'aspectRatios', type: 'AspectRatio', module: 'v', variable: '$aspect-ratios', kind: 'map', source: 'core/scss/_variables.scss' },
  { name: 'breakpoints', type: 'Breakpoint', module: 's', variable: '$grid-breakpoints', kind: 'map', source: 'core/scss/_settings.scss' },
  { name: 'breadcrumbVariants', type: 'BreadcrumbVariant', module: 'v', variable: '$breadcrumb-variants', kind: 'map', source: 'core/scss/_variables.scss' },
  { name: 'formValidationStates', type: 'FormValidationState', module: 'v', variable: '$form-validation-states', kind: 'map', source: 'core/scss/_variables.scss' },
  { name: 'paymentProviders', type: 'PaymentProvider', module: 'v', variable: '$payment-providers', kind: 'list', source: 'core/scss/_variables.scss' },
  { name: 'flagCountries', type: 'FlagCountry', module: 'v', variable: '$flag-countries', kind: 'list', source: 'core/scss/_variables.scss' },
  { name: 'patternSizes', type: 'PatternSize', module: 'p', variable: '$sizes', kind: 'map', source: 'core/scss/ui/_patterns.scss' },
] as const

const entry = `
@use 'sass:map';
@use 'variables' as v;
@use 'settings' as s;
@use 'ui/patterns' as p;
${TOKENS.map((t) => `@debug 'TOKEN ${t.name}=#{${t.kind === 'map' ? `map.keys(${t.module}.${t.variable})` : `${t.module}.${t.variable}`}}';`).join('\n')}
`

const keysByName = new Map<string, string[]>()
compileString(entry, {
  loadPaths: [scssDir],
  logger: {
    debug(message) {
      const match = message.match(/^TOKEN (\w+)=(.*)$/)
      if (match?.[1] && match[2] !== undefined) {
        keysByName.set(
          match[1],
          match[2].split(',').map((key) => key.trim()),
        )
      }
    },
    warn() {
      /* deprecations from core scss are handled by the css build, not here */
    },
  },
})

let output = `// Generated from the core SCSS maps by .build/generate-tokens.ts — DO NOT EDIT.
// Regenerate with: pnpm run generate-tokens
`
for (const token of TOKENS) {
  const keys = keysByName.get(token.name)
  if (!keys || keys.length === 0) {
    console.error(`✖ No keys extracted for ${token.variable} (${token.name}) — check the sass entry.`)
    process.exit(1)
  }
  output += `
/** Keys of \`${token.variable}\` (${token.source}). */
export const ${token.name} = [${keys.map((key) => `'${key}'`).join(', ')}] as const
export type ${token.type} = (typeof ${token.name})[number]
`
}

// Wrapped in main() because the root package is CJS (no top-level await).
const main = async () => {
  // Format with the repo prettier config so the generated file passes lint-prettier.
  const prettierConfig = await resolveConfig(outFile)
  const formatted = await format(output, { ...prettierConfig, filepath: outFile })

  if (mode === 'check') {
    const current = existsSync(outFile) ? readFileSync(outFile, 'utf8') : ''
    if (current !== formatted) {
      console.error(`✖ ${relative(repoRoot, outFile)} is stale — run "pnpm run generate-tokens" and commit the result.`)
      process.exit(1)
    }
    console.log(`✓ ${relative(repoRoot, outFile)} is up to date.`)
  } else {
    writeFileSync(outFile, formatted)
    console.log(`✓ Generated ${relative(repoRoot, outFile)} (${TOKENS.map((t) => t.name).join(', ')}).`)
  }
}

main()
