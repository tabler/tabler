import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest'
import { clearFixture, getFixture } from '../helpers/fixture'
import Colorpicker from '../../src/colorpicker'
import EventHandler from '../../src/bootstrap/dom/event-handler'

const PROPERTY_VALUE = '--tblr-colorpicker-value'

const typeInto = (input: HTMLInputElement, value: string): void => {
  input.value = value
  input.dispatchEvent(new Event('input', { bubbles: true }))
}

const commit = (input: HTMLInputElement): void => {
  input.dispatchEvent(new Event('change', { bubbles: true }))
}

const keydown = (element: Element, key: string, init: KeyboardEventInit = {}): void => {
  element.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true, ...init }))
}

const panels = (): HTMLElement[] => [...document.querySelectorAll<HTMLElement>('.colorpicker-panel')]

describe('Colorpicker', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  afterEach(() => {
    for (const element of fixtureEl.querySelectorAll<HTMLElement>('[data-bs-toggle="colorpicker"]')) {
      Colorpicker.getInstance(element)?.dispose()
    }

    for (const panel of panels()) {
      panel.remove()
    }

    clearFixture()
  })

  const mount = (html: string): HTMLInputElement => {
    fixtureEl.innerHTML = html
    return fixtureEl.querySelector('input')!
  }

  const field = (attributes = '', value = '#066fd1'): HTMLInputElement => mount(`<div class="colorpicker"><input type="text" class="form-control" data-bs-toggle="colorpicker" value="${value}" ${attributes}></div>`)

  describe('constructor', () => {
    it('reads the value from the field and paints the swatch', () => {
      const input = field()
      new Colorpicker(input)

      const wrapper = fixtureEl.querySelector<HTMLElement>('.colorpicker')!
      expect(wrapper.style.getPropertyValue(PROPERTY_VALUE)).toBe('rgb(6 111 209)')
      expect(Colorpicker.getInstance(input)!.getValue()).toBe('#066fd1')
    })

    it('stays empty on an empty field and paints nothing', () => {
      const input = field('', '')
      const instance = new Colorpicker(input)

      expect(instance.getValue()).toBe('')
      expect(fixtureEl.querySelector<HTMLElement>('.colorpicker')!.style.getPropertyValue(PROPERTY_VALUE)).toBe('')
    })

    it('does not build the panel before the first show', () => {
      new Colorpicker(field())

      expect(panels()).toHaveLength(0)
    })

    it('drops the alpha channel unless alpha is on', () => {
      const withoutAlpha = new Colorpicker(field('', '#066fd180'))
      expect(withoutAlpha.getValue()).toBe('#066fd1')
      withoutAlpha.dispose()

      const withAlpha = new Colorpicker(field('data-bs-alpha="true"', '#066fd180'))
      expect(withAlpha.getValue()).toBe('#066fd180')
    })
  })

  describe('show and hide', () => {
    it('opens the panel in the body with the dialog role and fires the events', async () => {
      const input = field()
      const instance = new Colorpicker(input)
      const show = vi.fn()
      const shown = vi.fn()
      EventHandler.on(input, 'show.bs.colorpicker', show)
      EventHandler.on(input, 'shown.bs.colorpicker', shown)

      await instance.show()

      const panel = panels()[0]!
      expect(panel.parentElement).toBe(document.body)
      expect(panel.classList.contains('show')).toBe(true)
      expect(panel.getAttribute('role')).toBe('dialog')
      expect(show).toHaveBeenCalledTimes(1)
      expect(shown).toHaveBeenCalledTimes(1)
      expect(panel.querySelector('.colorpicker-area')).not.toBeNull()
      expect(panel.querySelector('.colorpicker-hue')).not.toBeNull()
      expect(panel.querySelector('.colorpicker-alpha')).toBeNull()
      expect(panel.querySelectorAll('.colorpicker-swatch')).toHaveLength(12)
    })

    it('can be prevented', async () => {
      const input = field()
      const instance = new Colorpicker(input)
      EventHandler.on(input, 'show.bs.colorpicker', (event: Event) => event.preventDefault())

      await instance.show()

      expect(panels()).toHaveLength(0)
    })

    it('hides on Escape, on a click outside and on focus leaving', async () => {
      const input = field()
      const instance = new Colorpicker(input)
      const hidden = vi.fn()
      EventHandler.on(input, 'hidden.bs.colorpicker', hidden)

      await instance.show()
      keydown(document.body, 'Escape')
      expect(panels()[0]!.classList.contains('show')).toBe(false)
      expect(hidden).toHaveBeenCalledTimes(1)

      await instance.show()
      document.body.click()
      expect(hidden).toHaveBeenCalledTimes(2)

      await instance.show()
      const other = document.createElement('button')
      fixtureEl.append(other)
      other.focus()
      expect(hidden).toHaveBeenCalledTimes(3)
    })

    it('keeps the panel open on a click or focus inside', async () => {
      const input = field()
      const instance = new Colorpicker(input)

      await instance.show()
      panels()[0]!.click()
      input.click()
      panels()[0]!.querySelector<HTMLElement>('.colorpicker-input')!.focus()

      expect(panels()[0]!.classList.contains('show')).toBe(true)
    })

    it('returns focus to the field when the panel had it', async () => {
      const input = field()
      const instance = new Colorpicker(input)

      await instance.show()
      panels()[0]!.querySelector<HTMLElement>('.colorpicker-input')!.focus()
      await instance.hide()

      expect(document.activeElement).toBe(input)
    })

    it('opens on focus and toggles on click through the Data API', () => {
      const input = field()
      input.focus()
      input.dispatchEvent(new Event('focusin', { bubbles: true }))

      expect(Colorpicker.getInstance(input)).not.toBeNull()
      expect(panels()[0]!.classList.contains('show')).toBe(true)
    })
  })

  describe('picking', () => {
    it('writes a swatch to the field and fires change with the native events', async () => {
      const input = field()
      const instance = new Colorpicker(input, { swatches: ['#ff0000', 'rgb(0 255 0)'] })
      const change = vi.fn()
      const nativeInput = vi.fn()
      const nativeChange = vi.fn()
      input.addEventListener('change.bs.colorpicker', change)
      input.addEventListener('input', nativeInput)
      input.addEventListener('change', nativeChange)

      await instance.show()
      const swatches = panels()[0]!.querySelectorAll<HTMLButtonElement>('.colorpicker-swatch')
      expect(swatches).toHaveLength(2)
      swatches[1]!.click()

      expect(input.value).toBe('#00ff00')
      expect(change).toHaveBeenCalledTimes(1)
      expect((change.mock.calls[0]![0] as CustomEvent & { value: string; rgba: { r: number } }).value).toBe('#00ff00')
      expect(nativeInput).toHaveBeenCalledTimes(1)
      expect(nativeChange).toHaveBeenCalledTimes(1)
    })

    it('follows the hue slider', async () => {
      const input = field('', '#ff0000')
      const instance = new Colorpicker(input)

      await instance.show()
      const hue = panels()[0]!.querySelector<HTMLInputElement>('.colorpicker-hue')!
      expect(hue.value).toBe('0')
      typeInto(hue, '120')

      expect(input.value).toBe('#00ff00')
      expect(panels()[0]!.style.getPropertyValue('--tblr-colorpicker-hue')).toBe('120')
    })

    it('moves the marker with the arrow keys', async () => {
      const input = field('', '#ff0000')
      const instance = new Colorpicker(input)

      await instance.show()
      const marker = panels()[0]!.querySelector<HTMLElement>('.colorpicker-marker')!
      expect(marker.style.insetInlineStart).toBe('100%')
      keydown(marker, 'ArrowLeft', { shiftKey: true })
      keydown(marker, 'ArrowDown')

      expect(marker.style.insetInlineStart).toBe('90%')
      expect(marker.style.top).toBe('1%')
      expect(marker.getAttribute('aria-label')).toBe('Saturation: 90%. Brightness: 99%.')
      expect(input.value).toBe('#fc1919')
    })

    it('picks at the pointer position in the area', async () => {
      const input = field('', '#ff0000')
      const instance = new Colorpicker(input)

      await instance.show()
      const area = panels()[0]!.querySelector<HTMLElement>('.colorpicker-area')!
      area.style.width = '200px'
      area.style.height = '100px'
      const rect = area.getBoundingClientRect()
      area.dispatchEvent(new PointerEvent('pointerdown', { button: 0, clientX: rect.left + 100, clientY: rect.top + 100, bubbles: true, cancelable: true }))
      document.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }))

      expect(instance.getValue()).toBe('#000000')
    })

    it('keeps the alpha from the opacity slider in hex8', async () => {
      const input = field('data-bs-alpha="true"', '#ff0000')
      const instance = new Colorpicker(input)

      await instance.show()
      typeInto(panels()[0]!.querySelector<HTMLInputElement>('.colorpicker-alpha')!, '50')

      expect(input.value).toBe('#ff000080')
    })

    it('switches the notation with the format select', async () => {
      const input = field('data-bs-format-toggle="true"')
      const instance = new Colorpicker(input)

      await instance.show()
      const select = panels()[0]!.querySelector<HTMLSelectElement>('.colorpicker-format')!
      select.value = 'rgb'
      commit(select as unknown as HTMLInputElement)

      expect(input.value).toBe('rgb(6 111 209)')
    })

    it('reads a colour typed in the panel', async () => {
      const input = field()
      const instance = new Colorpicker(input)

      await instance.show()
      typeInto(panels()[0]!.querySelector<HTMLInputElement>('.colorpicker-input')!, 'hsl(120 100% 50%)')

      expect(input.value).toBe('#00ff00')
    })
  })

  describe('the field', () => {
    it('follows what is typed and leaves the text alone until commit', () => {
      const input = field()
      const instance = new Colorpicker(input)
      const change = vi.fn()
      input.addEventListener('change.bs.colorpicker', change)

      typeInto(input, 'RGB(255, 0, 0)')
      expect(input.value).toBe('RGB(255, 0, 0)')
      expect(instance.getValue()).toBe('#ff0000')
      expect(change).toHaveBeenCalledTimes(1)

      commit(input)
      expect(input.value).toBe('#ff0000')
    })

    it('ignores an invalid entry and restores the value on commit', () => {
      const input = field()
      const instance = new Colorpicker(input)

      typeInto(input, '#12')
      expect(instance.getValue()).toBe('#066fd1')

      commit(input)
      expect(input.value).toBe('#066fd1')
    })

    it('clears the value when the field is emptied', () => {
      const input = field()
      const instance = new Colorpicker(input)
      const change = vi.fn()
      input.addEventListener('change.bs.colorpicker', change)

      typeInto(input, '')

      expect(instance.getValue()).toBe('')
      expect(fixtureEl.querySelector<HTMLElement>('.colorpicker')!.style.getPropertyValue(PROPERTY_VALUE)).toBe('')
      expect((change.mock.calls[0]![0] as CustomEvent & { rgba: unknown }).rgba).toBeNull()
    })

    it('keeps the notation the value came in with format auto', () => {
      const input = field('data-bs-format="auto"', 'rgb(6 111 209)')
      const instance = new Colorpicker(input)

      expect(instance.getValue()).toBe('rgb(6 111 209)')
      typeInto(input, 'oklch(54.6% 0.1724 254.2)')
      expect(instance.getValue()).toMatch(/^oklch\(/)
    })

    it('moves focus into the panel on Tab and back out at the end', async () => {
      const input = field('data-bs-close-button="true"')
      const instance = new Colorpicker(input)

      await instance.show()
      input.focus()
      keydown(input, 'Tab')
      const marker = panels()[0]!.querySelector<HTMLElement>('.colorpicker-marker')!
      expect(document.activeElement).toBe(marker)

      const close = panels()[0]!.querySelector<HTMLElement>('.colorpicker-close')!
      close.focus()
      keydown(close, 'Tab')
      expect(panels()[0]!.classList.contains('show')).toBe(false)
      expect(document.activeElement).toBe(input)
    })
  })

  describe('options', () => {
    it('reads swatches from a comma list', async () => {
      const input = field('data-bs-swatches="#ff0000, #00ff00"')
      const instance = new Colorpicker(input)

      await instance.show()

      expect(panels()[0]!.querySelectorAll('.colorpicker-swatch')).toHaveLength(2)
    })

    it('leaves only the swatches with swatchesOnly', async () => {
      const input = field('data-bs-swatches-only="true"')
      const instance = new Colorpicker(input)

      await instance.show()
      const panel = panels()[0]!

      expect(panel.querySelector('.colorpicker-area')).toBeNull()
      expect(panel.querySelector('.colorpicker-hue')).toBeNull()
      expect(panel.querySelector('.colorpicker-input')).toBeNull()
      expect(panel.querySelector('.colorpicker-footer')).toBeNull()
      expect(panel.querySelectorAll('.colorpicker-swatch').length).toBeGreaterThan(0)
    })

    it('keeps the buttons but not the format select with swatchesOnly', async () => {
      const input = field('data-bs-swatches-only="true" data-bs-format-toggle="true" data-bs-close-button="true"')
      const instance = new Colorpicker(input)

      await instance.show()
      const panel = panels()[0]!

      expect(panel.querySelector('.colorpicker-format')).toBeNull()
      expect(panel.querySelector('.colorpicker-input')).toBeNull()
      expect(panel.querySelector('.colorpicker-close')).not.toBeNull()
    })

    it('adds the clear and close buttons on request', async () => {
      const input = field('data-bs-clear-button="true" data-bs-close-button="true"')
      const instance = new Colorpicker(input)

      await instance.show()
      panels()[0]!.querySelector<HTMLElement>('.colorpicker-clear')!.click()
      expect(input.value).toBe('')

      panels()[0]!.querySelector<HTMLElement>('.colorpicker-close')!.click()
      expect(panels()[0]!.classList.contains('show')).toBe(false)
    })

    it('renders inline right after the wrapper and never hides', async () => {
      const input = field('data-bs-inline="true"')
      const instance = new Colorpicker(input)

      expect(input.nextElementSibling).toBeNull()
      const panel = input.closest('.colorpicker')!.nextElementSibling as HTMLElement
      expect(panel.classList.contains('colorpicker-panel-inline')).toBe(true)
      expect(panel.classList.contains('show')).toBe(true)

      await instance.hide()
      expect(panel.classList.contains('show')).toBe(true)
    })

    it('renders inline right after a field without the wrapper', () => {
      fixtureEl.innerHTML = '<input type="text" data-bs-toggle="colorpicker" data-bs-inline="true" value="#fff">'
      const input = fixtureEl.querySelector('input')!
      new Colorpicker(input)

      expect(input.nextElementSibling!.classList.contains('colorpicker-panel-inline')).toBe(true)
    })

    it('copies the theme of the nearest ancestor to the panel and follows changes', async () => {
      fixtureEl.innerHTML = '<div data-bs-theme="dark"><input type="text" data-bs-toggle="colorpicker" value="#fff"></div>'
      const input = fixtureEl.querySelector('input')!
      const instance = new Colorpicker(input)

      await instance.show()
      expect(panels()[0]!.getAttribute('data-bs-theme')).toBe('dark')

      fixtureEl.firstElementChild!.setAttribute('data-bs-theme', 'light')
      await new Promise((resolve) => setTimeout(resolve))
      expect(panels()[0]!.getAttribute('data-bs-theme')).toBe('light')
    })

    it('honours colorpickerTheme over the ancestor', async () => {
      fixtureEl.innerHTML = '<div data-bs-theme="dark"><input type="text" data-bs-toggle="colorpicker" data-bs-colorpicker-theme="light" value="#fff"></div>'
      const instance = new Colorpicker(fixtureEl.querySelector('input')!)

      await instance.show()

      expect(panels()[0]!.getAttribute('data-bs-theme')).toBe('light')
    })

    it('opens inside the modal the field is in', async () => {
      fixtureEl.innerHTML = '<div class="modal"><div class="colorpicker"><input type="text" data-bs-toggle="colorpicker" value="#fff"></div></div>'
      const instance = new Colorpicker(fixtureEl.querySelector('input')!)

      await instance.show()

      expect(panels()[0]!.parentElement).toBe(fixtureEl.querySelector('.modal'))
    })

    it('honours an explicit container over the modal', async () => {
      fixtureEl.innerHTML = '<div class="modal"><input type="text" data-bs-toggle="colorpicker" data-bs-container="body" value="#fff"></div>'
      const instance = new Colorpicker(fixtureEl.querySelector('input')!)

      await instance.show()

      expect(panels()[0]!.parentElement).toBe(document.body)
    })

    it('keeps Escape from the elements around it', async () => {
      const input = field()
      const instance = new Colorpicker(input)
      const outer = vi.fn()
      fixtureEl.addEventListener('keydown', outer)

      await instance.show()
      keydown(input, 'Escape')
      expect(panels()[0]!.classList.contains('show')).toBe(false)
      expect(outer).not.toHaveBeenCalled()

      keydown(input, 'Escape')
      expect(outer).toHaveBeenCalledTimes(1)
      fixtureEl.removeEventListener('keydown', outer)
    })

    it('replaces the labels', async () => {
      const input = field()
      const instance = new Colorpicker(input, { labels: { dialog: 'Kolor', hue: 'Odcień' } })

      await instance.show()
      const panel = panels()[0]!

      expect(panel.getAttribute('aria-label')).toBe('Kolor')
      expect(panel.querySelector('.colorpicker-hue')!.getAttribute('aria-label')).toBe('Odcień')
      expect(panel.querySelector('.colorpicker-input')!.getAttribute('aria-label')).toBe('Color value')
    })
  })

  describe('button trigger', () => {
    it('keeps the value in the hidden input and paints the button', async () => {
      fixtureEl.innerHTML = '<button type="button" class="btn" data-bs-toggle="colorpicker"><input type="hidden" name="color" value="#ff0000"><span class="colorpicker-preview"></span> Color</button>'
      const button = fixtureEl.querySelector('button')!
      const hidden = fixtureEl.querySelector('input')!

      button.click()
      const instance = Colorpicker.getInstance(button) as Colorpicker
      expect(instance.getValue()).toBe('#ff0000')
      expect(button.style.getPropertyValue(PROPERTY_VALUE)).toBe('rgb(255 0 0)')
      expect(panels()[0]!.classList.contains('show')).toBe(true)

      instance.setValue('#00ff00')
      expect(hidden.value).toBe('#00ff00')
      expect(button.style.getPropertyValue(PROPERTY_VALUE)).toBe('rgb(0 255 0)')

      button.click()
      expect(panels()[0]!.classList.contains('show')).toBe(false)
    })

    it('tells assistive technology about the popup and its state', async () => {
      fixtureEl.innerHTML = '<button type="button" data-bs-toggle="colorpicker" data-bs-value="#00f">Color</button>'
      const button = fixtureEl.querySelector('button')!
      const instance = new Colorpicker(button)

      expect(button.getAttribute('aria-haspopup')).toBe('dialog')
      expect(button.getAttribute('aria-expanded')).toBe('false')

      await instance.show()
      expect(button.getAttribute('aria-expanded')).toBe('true')

      await instance.hide()
      expect(button.getAttribute('aria-expanded')).toBe('false')
    })

    it('writes the value to the display element', () => {
      fixtureEl.innerHTML = '<button type="button" data-bs-toggle="colorpicker" data-bs-value="#00f"><span data-bs-colorpicker-display>Pick</span></button>'
      const display = fixtureEl.querySelector('span')!
      const instance = new Colorpicker(fixtureEl.querySelector('button')!)

      expect(display.textContent).toBe('#0000ff')

      instance.setValue('#ff0000')
      expect(display.textContent).toBe('#ff0000')
    })

    it('leaves the display text alone while there is no value', () => {
      fixtureEl.innerHTML = '<button type="button" data-bs-toggle="colorpicker"><span data-bs-colorpicker-display>Pick a color</span></button>'
      new Colorpicker(fixtureEl.querySelector('button')!)

      expect(fixtureEl.querySelector('span')!.textContent).toBe('Pick a color')
    })

    it('starts from the value option without an input', () => {
      fixtureEl.innerHTML = '<button type="button" data-bs-toggle="colorpicker" data-bs-value="#00f">Color</button>'
      const instance = new Colorpicker(fixtureEl.querySelector('button')!)

      expect(instance.getValue()).toBe('#0000ff')
    })
  })

  describe('API', () => {
    it('sets and clears the value', () => {
      const input = field()
      const instance = new Colorpicker(input)

      instance.setValue('oklch(100% 0 0)')
      expect(input.value).toBe('#ffffff')

      instance.setValue('nope')
      expect(input.value).toBe('#ffffff')

      instance.setValue(null)
      expect(input.value).toBe('')
      expect(instance.getValue()).toBe('')
    })

    it('disposes the panel and the document listeners', async () => {
      const input = field()
      const instance = new Colorpicker(input)

      await instance.show()
      instance.dispose()

      expect(panels()).toHaveLength(0)
      expect(Colorpicker.getInstance(input)).toBeNull()
      document.body.click()
    })

    it('exposes the defaults', () => {
      expect(Colorpicker.NAME).toBe('colorpicker')
      expect(Colorpicker.Default.format).toBe('hex')
      expect(Colorpicker.Default.alpha).toBe(false)
      expect(Object.keys(Colorpicker.DefaultType)).toEqual(Object.keys(Colorpicker.Default))
    })
  })
})
