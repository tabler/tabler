import { describe, expect, it } from 'vitest'
import { staticPath, assetRoot, tablerJsPath } from './assets'

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

describe('tablerJsPath', () => {
  it('points at the minified module outside development', () => {
    expect(tablerJsPath()).toBe('./dist/js/tabler.min.js')
  })

  it('takes the page root for nested pages', () => {
    expect(tablerJsPath('..')).toBe('../dist/js/tabler.min.js')
  })
})
