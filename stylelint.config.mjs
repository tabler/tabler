import stylistic from '@stylistic/stylelint-config'

const prettierOwned = Object.fromEntries(Object.keys(stylistic.rules).map((rule) => [rule, null]))

export default {
  extends: ['stylelint-config-twbs-bootstrap'],
  ignoreFiles: ['**/node_modules/**', '**/dist/**'],
  rules: {
    ...prettierOwned,
    'scss/dollar-variable-colon-space-after': null,
    'selector-no-qualifying-type': null,
    'scss/at-function-named-arguments': null,
  },
  overrides: [
    {
      files: ['core/scss/bootstrap/**/*.scss', 'core/scss/mixins/bootstrap/**/*.scss'],
      rules: { 'scss/operator-no-unspaced': null },
    },
    {
      files: ['core/scss/tests/**/*.scss'],
      rules: { 'declaration-no-important': null, 'color-named': null },
    },
    {
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
