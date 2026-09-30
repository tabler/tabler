// typescript-eslint supports TypeScript up to 6.0, while the repo builds with
// TypeScript 7. ESLint's TypeScript packages get their own TypeScript 5.9
// instead of the workspace one. Drop this once typescript-eslint supports 7.
const LINT_TYPESCRIPT = '5.9.3'
const usesLintTypescript = (name = '') => name === 'typescript-eslint' || name === 'ts-api-utils' || name.startsWith('@typescript-eslint/')

function readPackage(pkg) {
  if (usesLintTypescript(pkg.name) && (pkg.peerDependencies?.typescript || pkg.dependencies?.typescript)) {
    delete pkg.peerDependencies?.typescript
    pkg.dependencies = { ...pkg.dependencies, typescript: LINT_TYPESCRIPT }
  }
  return pkg
}

export const hooks = { readPackage }
