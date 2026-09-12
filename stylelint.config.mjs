// Keep this dependency on the same major as stylelint-config-twbs-bootstrap uses
// (currently @stylistic/stylelint-config@^2 / @stylistic/stylelint-plugin@^3). A newer
// major lists rule names the plugin twbs loads does not register, and stylelint then
// fails every file with "Unknown rule @stylistic/…".
import stylistic from '@stylistic/stylelint-config'

// Prettier already owns SCSS formatting in this repo (`pnpm lint:prettier`), so every
// purely stylistic rule that stylelint-config-twbs-bootstrap pulls in through @stylistic
// is switched off — otherwise the two tools fight over quotes, indentation and zeros.
const prettierOwned = Object.fromEntries(Object.keys(stylistic.rules).map((rule) => [rule, null]))

export default {
  extends: ['stylelint-config-twbs-bootstrap'],
  ignoreFiles: [
    '**/node_modules/**',
    '**/dist/**',
    // sass-true fixtures spell out the exact CSS a mixin must emit, so any autofix here
    // (property order, `!important`, hex length) rewrites the assertion and breaks
    // `pnpm test:scss`. Bootstrap excludes its own `**/tests/` for the same reason.
    'core/scss/tests/**',
  ],
  rules: {
    ...prettierOwned,
    'scss/dollar-variable-colon-space-after': null,
    'selector-no-qualifying-type': null,
    'scss/at-function-named-arguments': null,
    'import-notation': null,
    'value-keyword-case': ['lower', { ignoreProperties: ['/^\\$font-family/', '/^--.*font/'], camelCaseSvgKeywords: true }],
    'declaration-no-important': null,
  },
  overrides: [
    {
      // Copied from upstream Bootstrap, which lints them under its own scss/vendor/ exclusion.
      // Their declaration order is upstream's and is asserted by scss/tests — reordering it
      // creates sync noise on every Bootstrap bump for no gain.
      files: ['core/scss/bootstrap/**/*.scss', 'core/scss/mixins/bootstrap/**/*.scss'],
      rules: { 'scss/operator-no-unspaced': null, 'order/properties-order': null },
    },
    {
      // Overrides for third-party widgets — their class names and specificity aren't ours.
      files: ['core/scss/vendor/**/*.scss'],
      rules: {
        'declaration-no-important': null,
        'selector-class-pattern': null,
        'selector-max-class': null,
        'selector-max-compound-selectors': null,
        'custom-property-no-missing-var-function': null,
        'scss/selector-no-redundant-nesting-selector': null,
      },
    },
  ],
}
