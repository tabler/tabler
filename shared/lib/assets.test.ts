import { afterEach, describe, expect, it, vi } from 'vitest'
import { staticPath, assetRoot, distJsPath } from './assets'

// TABLER_STATIC_BASE is not defined in the test environment, so the relative
// default ('./static') applies — same as the downloadable preview package.
describe('staticPath', () => {
  it('joins the file with the static base', () => {
    expect(staticPath('photos/cat.jpg')).toBe('./static/photos/cat.jpg')
  })

  it('strips leading slashes from the file', () => {
    expect(staticPath('/photos/cat.jpg')).toBe('./static/photos/cat.jpg')
  })
})

describe('assetRoot', () => {
  it('is the base without the /static suffix', () => {
    expect(assetRoot).toBe('.')
  })
})

describe('distJsPath', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('points at the minified bundle outside development', () => {
    vi.stubEnv('NODE_ENV', 'production')
    expect(distJsPath('tabler')).toBe('./dist/js/tabler.min.js')
  })

  it('points at the unminified bundle in development', () => {
    vi.stubEnv('NODE_ENV', 'development')
    expect(distJsPath('tabler')).toBe('./dist/js/tabler.js')
  })

  it('accepts another base', () => {
    vi.stubEnv('NODE_ENV', 'production')
    expect(distJsPath('tabler', '..')).toBe('../dist/js/tabler.min.js')
  })
})
