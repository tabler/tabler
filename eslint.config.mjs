import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import astro from 'eslint-plugin-astro'
import globals from 'globals'

// Same files Prettier formats, plus the Astro components and pages
const SCRIPTS = ['core/js/**/*.{js,ts}', 'core/.build/**/*.{ts,mts,mjs}', '.build/**/*.{ts,mts}', 'screenshots/.build/**/*.ts', '{preview,docs,screenshots}/**/*.{mjs,mts,ts}', 'shared/**/*.{js,mjs,mts,ts}']
const ASTRO = ['{preview,docs,screenshots,shared}/**/*.astro']

// Dot directories are skipped by the `**/*` include of the package tsconfigs; `.build/tsconfig.json` covers them
const BUILD_SCRIPTS = ['.build/**', 'core/.build/**', 'screenshots/.build/**']

export default tseslint.config(
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/public/**', '**/tmp-assets/**', '**/coverage/**', '**/.astro/**', '.cache/**', '.claude/**', '.cursor/**', 'packages-zip/**'],
  },
  {
    files: [...SCRIPTS, ...ASTRO],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  {
    files: SCRIPTS,
    extends: [js.configs.recommended, ...tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: {
        projectService: { allowDefaultProject: ['docs/pages/.well-known/*.ts', 'docs/pages/.well-known/*/*.ts', 'docs/pages/.well-known/*/*/*.ts', 'preview/.build/*.mjs'] },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: [...SCRIPTS, ...ASTRO],
    rules: {
      'prefer-const': ['error', { destructuring: 'all' }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrors: 'none' }],
    },
  },
  {
    // Only the shipped bundle is held to them. Elsewhere `.astro` imports, plain `.mjs`
    // files and JSON reach the type checker as `any`, so these rules report noise.
    files: SCRIPTS,
    ignores: ['core/js/src/**'],
    rules: {
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
    },
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
  ...astro.configs.recommended,
  {
    files: ['**/*.astro/*.ts'],
    languageOptions: { parser: tseslint.parser },
  },
  {
    files: ASTRO,
    plugins: { '@typescript-eslint': tseslint.plugin },
    languageOptions: { parserOptions: { parser: tseslint.parser, extraFileExtensions: ['.astro'] } },
    rules: {
      ...Object.assign({}, ...tseslint.configs.recommended.map((config) => config.rules ?? {})),
      // Demo components take loosely shaped demo data
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
)
