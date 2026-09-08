// The cascade layers replace `!important` on utilities: the `utilities` layer
// is declared last, so a utility must beat a component rule of higher
// specificity, and an unlayered project rule must beat both. Compiles the real
// stylesheet through Vite's Sass support and checks the cascade in a browser.
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import css from '../../../scss/tabler.scss?inline'

let style: HTMLStyleElement
let host: HTMLDivElement

beforeAll(() => {
  style = document.createElement('style')
  style.textContent = css
  document.head.append(style)
  host = document.createElement('div')
  document.body.append(host)
})

afterAll(() => {
  style.remove()
  host.remove()
})

function render(html: string): HTMLElement {
  host.innerHTML = html
  return host.firstElementChild as HTMLElement
}

describe('cascade layers', () => {
  it('declares the layer order before any rule', () => {
    // Sass keeps the doc comments of the mixins ahead of the first rule.
    const firstStatement = css
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/@charset\s+"[^"]*";/, '')
      .trimStart()
    expect(firstStatement.startsWith('@layer colors, config, root, reboot, layout, content, forms, components, custom, helpers, utilities;')).toBe(true)
  })

  it('emits utilities without !important', () => {
    expect(css).not.toMatch(/\.d-none\s*\{[^}]*!important/)
    expect(css).not.toMatch(/\.mt-3\s*\{[^}]*!important/)
  })

  it('lets a utility beat a component rule of higher specificity', () => {
    const el = render('<div class="card"><div class="card-body p-0">x</div></div>')
    const body = el.querySelector('.card-body') as HTMLElement
    expect(getComputedStyle(body).paddingTop).toBe('0px')
    const btn = render('<div class="btn-list"><button class="btn d-none">x</button></div>').querySelector('.btn') as HTMLElement
    expect(getComputedStyle(btn).display).toBe('none')
  })

  it('lets an unlayered project rule beat a utility', () => {
    const own = document.createElement('style')
    own.textContent = '.project-block { display: block; }'
    document.head.append(own)
    const el = render('<span class="d-none project-block">x</span>')
    expect(getComputedStyle(el).display).toBe('block')
    own.remove()
  })

  it('lets the custom layer beat components but lose to utilities', () => {
    const own = document.createElement('style')
    own.textContent = '@layer custom { .card { padding-top: 7px; } }'
    document.head.append(own)
    const card = render('<div class="card">x</div>')
    expect(getComputedStyle(card).paddingTop).toBe('7px')
    card.classList.add('pt-0')
    expect(getComputedStyle(card).paddingTop).toBe('0px')
    own.remove()
  })
})
