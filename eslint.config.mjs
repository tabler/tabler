import { fileURLToPath } from 'node:url'
import { includeIgnoreFile } from '@eslint/compat'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import astro from 'eslint-plugin-astro'
import globals from 'globals'

// Same files Prettier formats, linted with type information
const SCRIPTS = ['core/js/**/*.{js,ts}', 'core/.build/**/*.{ts,mts,mjs}', '.build/**/*.{ts,mts}', 'screenshots/.build/**/*.ts', '{preview,docs,screenshots}/**/*.{mjs,mts,ts}', 'shared/**/*.{js,mjs,mts,ts}']
// Config files and SCSS tests that no tsconfig includes, linted without type information
const TOOLING = ['*.{js,mjs,cjs}', '.changeset/*.cjs', 'core/*.{mjs,mts}', 'core/scss/tests/**/*.mjs']
const ASTRO = ['{preview,docs,screenshots,shared}/**/*.astro']
// The `<script>` blocks of Astro files, which the Astro processor hands over as virtual files
const ASTRO_SCRIPTS = ['**/*.astro/*.js', '**/*.astro/*.ts']

// Dot directories are skipped by the `**/*` include of the package tsconfigs; `.build/tsconfig.json` covers them
const BUILD_SCRIPTS = ['.build/**', 'core/.build/**', 'screenshots/.build/**']

const unsafeRulesOff = {
  '@typescript-eslint/no-unsafe-assignment': 'off',
  '@typescript-eslint/no-unsafe-member-access': 'off',
  '@typescript-eslint/no-unsafe-argument': 'off',
  '@typescript-eslint/no-unsafe-call': 'off',
  '@typescript-eslint/no-unsafe-return': 'off',
}

export default tseslint.config(
  includeIgnoreFile(fileURLToPath(new URL('.gitignore', import.meta.url))),
  {
    ignores: ['.claude/**', '.cursor/**'],
  },
  {
    files: [...SCRIPTS, ...TOOLING, ...ASTRO, ...ASTRO_SCRIPTS],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  {
    files: SCRIPTS,
    ignores: ASTRO_SCRIPTS,
    extends: [js.configs.recommended, ...tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: {
        projectService: { allowDefaultProject: ['docs/pages/.well-known/*.ts', 'docs/pages/.well-known/*/*.ts', 'docs/pages/.well-known/*/*/*.ts', 'preview/.build/*.mjs'] },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: [...TOOLING, ...ASTRO_SCRIPTS],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
  },
  {
    files: [...SCRIPTS, ...TOOLING, ...ASTRO, ...ASTRO_SCRIPTS],
    rules: {
      'prefer-const': ['error', { destructuring: 'all' }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrors: 'none' }],
    },
  },
  {
    // Only the shipped bundle is held to them. Elsewhere `.astro` imports, plain `.mjs`
    // files and JSON reach the type checker as `any`, so these rules report noise.
    files: SCRIPTS,
    ignores: ['core/js/src/**', ...ASTRO_SCRIPTS],
    rules: unsafeRulesOff,
  },
  {
    files: BUILD_SCRIPTS,
    languageOptions: { parserOptions: { projectService: false, project: './.build/tsconfig.json' } },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  },
  {
    // `core/tsconfig.json` leaves the specs out, so they are linted without type information
    files: ['core/js/tests/**'],
    extends: [tseslint.configs.disableTypeChecked],
    rules: { '@typescript-eslint/no-explicit-any': 'off' },
  },
  {
    // Bootstrap registers its static Data API handlers unbound, the same as upstream
    files: ['core/js/src/bootstrap/**'],
    rules: { '@typescript-eslint/unbound-method': 'off' },
  },
  {
    // Ambient declarations of globals have to use `var`
    files: ['**/*.d.ts'],
    rules: { 'no-var': 'off' },
  },
  {
    // Inline scripts ship as-is in the demo HTML: they keep the repo's init pattern
    // (`a && b()`, `ready ? init() : on(...)`) and the ES5 style some of them use
    files: ASTRO_SCRIPTS,
    rules: {
      'no-var': 'off',
      '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
      '@typescript-eslint/ban-ts-comment': ['error', { 'ts-nocheck': 'allow-with-description' }],
    },
  },
  ...astro.configs.recommended,
  {
    files: ['**/*.astro/*.ts'],
    languageOptions: { parser: tseslint.parser },
  },
  {
    // Rules only: the configs' own parser setting would replace the Astro parser
    files: ASTRO,
    plugins: { '@typescript-eslint': tseslint.plugin },
    languageOptions: { parserOptions: { parser: tseslint.parser, extraFileExtensions: ['.astro'] } },
    rules: {
      ...js.configs.recommended.rules,
      ...Object.assign({}, ...tseslint.configs.recommended.map((config) => config.rules ?? {})),
      // TypeScript already checks names in the frontmatter and the template
      'no-undef': 'off',
      // Demo components take loosely shaped demo data
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
)
