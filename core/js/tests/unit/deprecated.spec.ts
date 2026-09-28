import { describe, it, expect, afterEach } from 'vitest'
import { tabler } from '../../tabler'

describe('deprecated tabler namespace', () => {
  afterEach(() => {
    document.body.style.removeProperty('--tblr-test')
  })

  it('should keep the 1.5 exports', () => {
    expect(tabler.prefix).toBe('tblr-')
    expect(typeof tabler.getColor).toBe('function')
    expect(typeof tabler.hexToRgba).toBe('function')
  })

  it('should turn a hex colour into rgba', () => {
    expect(tabler.hexToRgba('#066fd1', 0.5)).toBe('rgba(6, 111, 209, 0.5)')
    expect(tabler.hexToRgba('oklch(54.6% 0.17 254deg)', 0.5)).toBeNull()
  })

  it('should read a custom property as it is', () => {
    document.body.style.setProperty('--tblr-test', '#066fd1')

    expect(tabler.getColor('test')).toBe('#066fd1')
  })

  it('should apply the opacity to a hex and to an oklch colour', () => {
    document.body.style.setProperty('--tblr-test', '#066fd1')
    expect(tabler.getColor('test', 0.5)).toBe('rgba(6, 111, 209, 0.5)')

    document.body.style.setProperty('--tblr-test', 'oklch(54.6% 0.17 254deg)')
    expect(tabler.getColor('test', 0.5)).toBe('color-mix(in srgb, oklch(54.6% 0.17 254deg) 50%, transparent)')
  })
})
