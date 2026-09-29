import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from 'vitest'
import { clearFixture, getFixture } from '../helpers/fixture'
import Combobox from '../../src/combobox'

const markup = (attributes = '', extra = ''): string => `
  <form>
    <button class="form-select combobox-toggle" type="button" data-bs-toggle="combobox" data-bs-placeholder="Pick one" ${attributes}>
      <span class="combobox-value"></span>
    </button>
    <div class="dropdown-menu">
      ${extra}
      <button class="dropdown-item" type="button" data-bs-value="a">Alpha</button>
      <button class="dropdown-item" type="button" data-bs-value="b">Bravo</button>
      <button class="dropdown-item" type="button" data-bs-value="c" disabled>Charlie</button>
    </div>
  </form>`

describe('Combobox', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  afterEach(() => {
    clearFixture()
  })

  const setup = (attributes = '', extra = ''): { toggle: HTMLElement; menu: HTMLElement; combobox: Combobox } => {
    fixtureEl.innerHTML = markup(attributes, extra)
    const toggle = fixtureEl.querySelector<HTMLElement>('.combobox-toggle')!
    return { toggle, menu: fixtureEl.querySelector<HTMLElement>('.dropdown-menu')!, combobox: new Combobox(toggle) }
  }

  const item = (value: string): HTMLElement => fixtureEl.querySelector(`[data-bs-value="${value}"]`)!
  const key = (target: Element, name: string): void => {
    target.dispatchEvent(new KeyboardEvent('keydown', { key: name, bubbles: true, cancelable: true }))
  }

  describe('constructor', () => {
    it('should show the placeholder and set ARIA attributes', () => {
      const { toggle, menu } = setup()

      expect(toggle.querySelector('.combobox-value')!.textContent).toBe('Pick one')
      expect(toggle.querySelector('.combobox-value')!.classList.contains('combobox-placeholder')).toBe(true)
      expect(toggle.getAttribute('aria-haspopup')).toBe('listbox')
      expect(toggle.getAttribute('aria-expanded')).toBe('false')
      expect(menu.getAttribute('role')).toBe('listbox')
      expect(item('a').getAttribute('role')).toBe('option')
      expect(item('c').getAttribute('aria-disabled')).toBe('true')
    })

    it('should read a pre-selected item', () => {
      fixtureEl.innerHTML = markup('data-bs-name="letter"').replace('class="dropdown-item" type="button" data-bs-value="b"', 'class="dropdown-item selected" type="button" data-bs-value="b"')
      const toggle = fixtureEl.querySelector<HTMLElement>('.combobox-toggle')!
      new Combobox(toggle)

      expect(toggle.querySelector('.combobox-value')!.textContent).toBe('Bravo')
      expect(fixtureEl.querySelector<HTMLInputElement>('input[name="letter"]')!.value).toBe('b')
    })
  })

  describe('show / hide', () => {
    it('should toggle the menu and fire events', () => {
      const { toggle, menu, combobox } = setup()
      const shown = vi.fn()
      const hidden = vi.fn()
      toggle.addEventListener('shown.bs.combobox', shown)
      toggle.addEventListener('hidden.bs.combobox', hidden)

      combobox.show()
      expect(menu.classList.contains('show')).toBe(true)
      expect(toggle.getAttribute('aria-expanded')).toBe('true')
      expect(shown).toHaveBeenCalledOnce()

      combobox.hide()
      expect(menu.classList.contains('show')).toBe(false)
      expect(toggle.getAttribute('aria-expanded')).toBe('false')
      expect(hidden).toHaveBeenCalledOnce()
    })

    it('should not show when show.bs.combobox is prevented', () => {
      const { toggle, menu, combobox } = setup()
      toggle.addEventListener('show.bs.combobox', (event) => event.preventDefault())

      combobox.show()
      expect(menu.classList.contains('show')).toBe(false)
    })

    it('should open on click of the toggle', () => {
      const { toggle, menu } = setup()
      toggle.click()
      expect(menu.classList.contains('show')).toBe(true)
    })

    it('should not open a disabled toggle', () => {
      const { menu, combobox } = setup('disabled')
      combobox.show()
      expect(menu.classList.contains('show')).toBe(false)
    })

    it('should close on an outside click and on Escape', () => {
      const { toggle, menu, combobox } = setup()

      combobox.show()
      document.body.click()
      expect(menu.classList.contains('show')).toBe(false)

      combobox.show()
      key(item('a'), 'Escape')
      expect(menu.classList.contains('show')).toBe(false)
      expect(document.activeElement).toBe(toggle)
    })
  })

  describe('selection', () => {
    it('should select an item, update text and hidden input, and close', () => {
      const { toggle, menu, combobox } = setup('data-bs-name="letter"')
      const change = vi.fn()
      toggle.addEventListener('change.bs.combobox', change)

      combobox.show()
      item('b').click()

      expect(toggle.querySelector('.combobox-value')!.textContent).toBe('Bravo')
      expect(item('b').classList.contains('selected')).toBe(true)
      expect(item('b').getAttribute('aria-selected')).toBe('true')
      expect(fixtureEl.querySelector<HTMLInputElement>('input[name="letter"]')!.value).toBe('b')
      expect(menu.classList.contains('show')).toBe(false)
      expect(change).toHaveBeenCalledOnce()
      expect((change.mock.calls[0][0] as CustomEvent & { value: string }).value).toBe('b')
    })

    it('should replace the previous selection', () => {
      const { combobox } = setup()
      combobox.show()
      item('a').click()
      combobox.show()
      item('b').click()

      expect(item('a').classList.contains('selected')).toBe(false)
      expect(item('a').getAttribute('aria-selected')).toBe('false')
    })

    it('should ignore disabled items', () => {
      const { toggle, combobox } = setup()
      combobox.show()
      item('c').click()

      expect(item('c').classList.contains('selected')).toBe(false)
      expect(toggle.querySelector('.combobox-value')!.textContent).toBe('Pick one')
    })

    it('should select with Enter on a focused item', () => {
      const { combobox } = setup()
      combobox.show()
      key(item('a'), 'Enter')
      expect(item('a').classList.contains('selected')).toBe(true)
    })

    it('should end the list with "and N more" when it does not fit', () => {
      const { toggle, menu, combobox } = setup('data-bs-multiple="true"')
      const value = toggle.querySelector<HTMLElement>('.combobox-value')!
      Object.assign(value.style, { display: 'flex', width: '110px', overflow: 'hidden' })
      combobox.show()
      menu.querySelector<HTMLElement>('[data-bs-value="a"]')!.click()
      menu.querySelector<HTMLElement>('[data-bs-value="b"]')!.click()

      const label = value.querySelector<HTMLElement>('.text-truncate')!
      Object.assign(label.style, { overflow: 'hidden', whiteSpace: 'nowrap', display: 'block', width: '60px' })
      combobox._layoutList(['Alpha', 'Bravo', 'Charlie'])

      expect(label.textContent).toMatch(/^Alpha and 2 more$/)
    })

    it('should support multiple selection and keep the menu open', () => {
      const { toggle, menu, combobox } = setup('data-bs-multiple="true" data-bs-name="letters"')

      combobox.show()
      item('a').click()
      expect(toggle.querySelector('.combobox-value')!.textContent).toBe('Alpha')
      item('b').click()

      expect(toggle.querySelector('.combobox-value')!.textContent).toBe('Alpha, Bravo')
      expect(fixtureEl.querySelector<HTMLInputElement>('input[name="letters"]')!.value).toBe('a,b')
      expect(menu.classList.contains('show')).toBe(true)

      item('a').click()
      expect(item('a').classList.contains('selected')).toBe(false)
    })
  })

  describe('keyboard', () => {
    it('should open on ArrowDown and focus the first item', () => {
      const { toggle, menu } = setup()
      key(toggle, 'ArrowDown')

      expect(menu.classList.contains('show')).toBe(true)
      expect(document.activeElement).toBe(item('a'))
    })

    it('should move between enabled items with arrows, Home and End', () => {
      const { combobox } = setup()
      combobox.show()
      item('a').focus()

      key(item('a'), 'ArrowDown')
      expect(document.activeElement).toBe(item('b'))
      key(item('b'), 'Home')
      expect(document.activeElement).toBe(item('a'))
      key(item('a'), 'End')
      expect(document.activeElement).toBe(item('b'))
    })
  })

  describe('search', () => {
    const search = '<div class="combobox-search"><input type="text" class="combobox-search-input"></div><div class="combobox-no-results d-none">None</div>'

    it('should filter items and show the empty message', () => {
      setup('data-bs-search="true"', search)
      const input = fixtureEl.querySelector<HTMLInputElement>('.combobox-search-input')!
      const empty = fixtureEl.querySelector('.combobox-no-results')!

      input.value = 'alp'
      input.dispatchEvent(new Event('input', { bubbles: true }))
      expect(item('a').style.display).toBe('')
      expect(item('b').style.display).toBe('none')
      expect(empty.classList.contains('d-none')).toBe(true)

      input.value = 'zzz'
      input.dispatchEvent(new Event('input', { bubbles: true }))
      expect(empty.classList.contains('d-none')).toBe(false)
    })

    it('should ignore accents when searchNormalize is on', () => {
      fixtureEl.innerHTML = markup('data-bs-search-normalize="true"', search).replace('Alpha', 'Ålpha')
      new Combobox(fixtureEl.querySelector<HTMLElement>('.combobox-toggle')!)
      const input = fixtureEl.querySelector<HTMLInputElement>('.combobox-search-input')!

      input.value = 'alpha'
      input.dispatchEvent(new Event('input', { bubbles: true }))
      expect(item('a').style.display).toBe('')
    })
  })

  describe('dispose', () => {
    it('should remove the hidden input and the instance', () => {
      const { toggle, combobox } = setup('data-bs-name="letter"')
      combobox.dispose()

      expect(fixtureEl.querySelector('input[name="letter"]')).toBeNull()
      expect(Combobox.getInstance(toggle)).toBeNull()
    })
  })
  describe('native select', () => {
    const selectMarkup = (attributes = '', extra = ''): string => `
      <form>
        <label for="fruit">Fruit</label>
        <select id="fruit" class="form-select is-invalid" data-placeholder="Pick a fruit" ${attributes}>
          ${extra}
          <option value="a">Apple</option>
          <option value="b" data-custom-properties='<span class="avatar">B</span>'>Banana</option>
          <optgroup label="Citrus">
            <option value="c">Cherry</option>
            <option value="d" disabled>Date</option>
          </optgroup>
        </select>
      </form>`

    const setupSelect = (attributes = '', extra = '', config: Record<string, unknown> = {}): { select: HTMLSelectElement; toggle: HTMLElement; menu: HTMLElement; combobox: Combobox } => {
      fixtureEl.innerHTML = selectMarkup(attributes, extra)
      const select = fixtureEl.querySelector('select')!
      const combobox = new Combobox(select, config)
      return { select, toggle: select.nextElementSibling as HTMLElement, menu: fixtureEl.querySelector<HTMLElement>('.dropdown-menu')!, combobox }
    }

    it('should build the toggle and menu from options and optgroups', () => {
      const { select, toggle, menu } = setupSelect()

      expect(select.classList.contains('combobox-native')).toBe(true)
      expect(toggle.classList.contains('combobox-toggle')).toBe(true)
      expect(toggle.classList.contains('is-invalid')).toBe(true)
      expect(toggle.getAttribute('aria-labelledby')).toBe('fruit-label')
      expect(toggle.querySelector('.combobox-value')!.textContent).toBe('Pick a fruit')
      expect(menu.querySelectorAll('.dropdown-item')).toHaveLength(4)
      expect(menu.querySelector('.dropdown-header')!.textContent).toBe('Citrus')
      expect(menu.querySelector<HTMLButtonElement>('[data-bs-value="d"]')!.disabled).toBe(true)
      expect(menu.querySelector('.dropdown-item-indicator .avatar')).not.toBeNull()
      expect(menu.querySelector('.combobox-search-input')).not.toBeNull()
    })

    it('should skip the empty placeholder option and use its text as placeholder', () => {
      fixtureEl.innerHTML = '<select id="x"><option value="">Choose…</option><option value="a">Alpha</option></select>'
      const select = fixtureEl.querySelector('select')!
      new Combobox(select)

      expect(fixtureEl.querySelectorAll('.dropdown-item')).toHaveLength(1)
      expect(fixtureEl.querySelector('.combobox-value')!.textContent).toBe('Choose…')
    })

    it('should write the selection to the select and fire a native change', () => {
      const { select, toggle, menu, combobox } = setupSelect()
      const change = vi.fn()
      select.addEventListener('change', change)

      combobox.show()
      menu.querySelector<HTMLElement>('[data-bs-value="c"]')!.click()

      expect(select.value).toBe('c')
      expect(toggle.querySelector('.combobox-value')!.textContent).toBe('Cherry')
      expect(change).toHaveBeenCalled()
      expect(menu.classList.contains('show')).toBe(false)
    })

    it('should show a shortcut and a badge of the item in the toggle', () => {
      fixtureEl.innerHTML = markup().replace('>Alpha</button>', '><span class="dropdown-item-label">Alpha</span><kbd class="ms-auto">ctrl + A</kbd><span class="badge">3</span></button>')
      const toggle = fixtureEl.querySelector<HTMLElement>('.combobox-toggle')!
      new Combobox(toggle)
      item('a').click()

      expect(toggle.querySelector('.combobox-value kbd')!.textContent).toBe('ctrl + A')
      expect(toggle.querySelector('.combobox-value .badge')!.textContent).toBe('3')
      expect(toggle.querySelector('.combobox-value .text-truncate')!.textContent).toBe('Alpha')
    })

    it('should show the option markup in the toggle', () => {
      const { menu, toggle, combobox } = setupSelect()
      combobox.show()
      menu.querySelector<HTMLElement>('[data-bs-value="b"]')!.click()

      expect(toggle.querySelector('.avatar')).not.toBeNull()
      expect(toggle.textContent).toContain('Banana')
    })

    it('should pick up a value set from code after refresh', () => {
      const { select, toggle, combobox } = setupSelect()
      select.value = 'a'
      combobox.refresh()

      expect(toggle.querySelector('.combobox-value')!.textContent).toBe('Apple')
    })

    it('should sync when the select fires change', () => {
      const { select, toggle } = setupSelect()
      select.value = 'b'
      select.dispatchEvent(new Event('change', { bubbles: true }))

      expect(toggle.textContent).toContain('Banana')
    })

    it('should render tags for multiple and deselect one from the menu', () => {
      const { select, toggle, menu, combobox } = setupSelect('multiple')
      combobox.show()
      menu.querySelector<HTMLElement>('[data-bs-value="a"]')!.click()
      menu.querySelector<HTMLElement>('[data-bs-value="c"]')!.click()

      expect([...select.selectedOptions].map((option) => option.value)).toEqual(['a', 'c'])
      expect(toggle.querySelectorAll('.combobox-tag')).toHaveLength(2)
      expect(menu.classList.contains('show')).toBe(true)

      expect(toggle.querySelector('.btn-close')).toBeNull()

      menu.querySelector<HTMLElement>('[data-bs-value="a"]')!.click()
      expect([...select.selectedOptions].map((option) => option.value)).toEqual(['c'])
    })

    it('should remove the last tag on Backspace', () => {
      const { select, toggle, menu, combobox } = setupSelect('multiple')
      combobox.show()
      menu.querySelector<HTMLElement>('[data-bs-value="a"]')!.click()
      menu.querySelector<HTMLElement>('[data-bs-value="c"]')!.click()
      key(toggle, 'Backspace')

      expect([...select.selectedOptions].map((option) => option.value)).toEqual(['a'])
    })

    it('should collapse tags that do not fit into a +N tag', () => {
      const { toggle, menu, combobox } = setupSelect('multiple')
      const value = toggle.querySelector<HTMLElement>('.combobox-value')!
      Object.assign(value.style, { display: 'flex', width: '90px', overflow: 'hidden' })
      combobox.show()

      for (const option of ['a', 'b', 'c']) {
        menu.querySelector<HTMLElement>(`[data-bs-value="${option}"]`)!.click()
      }

      for (const tag of toggle.querySelectorAll<HTMLElement>('.combobox-tag')) {
        tag.style.flexShrink = '0'
      }

      combobox._layoutTags()

      const more = toggle.querySelector('.combobox-tag-more')!
      const hidden = toggle.querySelectorAll('.combobox-tag.d-none').length

      expect(hidden).toBeGreaterThan(0)
      expect(more.textContent).toBe(`+${hidden}`)
      expect(toggle.querySelectorAll('.combobox-tag:not(.d-none)').length).toBeGreaterThanOrEqual(1)
    })

    it('should keep every tag when tagsOverflow is wrap', () => {
      const { toggle, menu, combobox } = setupSelect('multiple', '', { tagsOverflow: 'wrap' })
      combobox.show()
      menu.querySelector<HTMLElement>('[data-bs-value="a"]')!.click()
      menu.querySelector<HTMLElement>('[data-bs-value="b"]')!.click()

      expect(toggle.querySelector('.combobox-tag-more')).toBeNull()
      expect(toggle.querySelector('.combobox-tags-wrap')).not.toBeNull()
    })

    it('should respect maxItems', () => {
      const { select, menu, combobox } = setupSelect('multiple', '', { maxItems: 1 })
      combobox.show()
      menu.querySelector<HTMLElement>('[data-bs-value="a"]')!.click()
      menu.querySelector<HTMLElement>('[data-bs-value="b"]')!.click()

      expect([...select.selectedOptions].map((option) => option.value)).toEqual(['a'])
    })

    it('should hide a group header when search matches none of its items', () => {
      const { menu } = setupSelect()
      const input = menu.querySelector<HTMLInputElement>('.combobox-search-input')!
      input.value = 'apple'
      input.dispatchEvent(new Event('input', { bubbles: true }))

      expect(menu.querySelector<HTMLElement>('.dropdown-header')!.style.display).toBe('none')
    })

    it('should move the menu into the container', () => {
      setupSelect('', '', { container: 'body' })
      const menu = document.querySelector<HTMLElement>('body > .dropdown-menu')

      expect(menu).not.toBeNull()
      menu!.remove()
    })

    it('should not build a search input when search is false', () => {
      const { menu } = setupSelect('', '', { search: false })
      expect(menu.querySelector('.combobox-search-input')).toBeNull()
    })

    it('should disable the toggle for a disabled select', () => {
      const { toggle, menu, combobox } = setupSelect('disabled')
      combobox.show()
      expect(menu.classList.contains('show')).toBe(false)
      expect(toggle.hasAttribute('disabled')).toBe(true)
    })

    it('should forward focus from the select to the toggle', () => {
      const { select, toggle } = setupSelect()
      select.focus()
      expect(document.activeElement).toBe(toggle)
    })

    it('should restore the select on dispose', () => {
      const { select, combobox } = setupSelect()
      combobox.dispose()

      expect(select.classList.contains('combobox-native')).toBe(false)
      expect(fixtureEl.querySelector('.combobox-toggle')).toBeNull()
      expect(fixtureEl.querySelector('.dropdown-menu')).toBeNull()
    })
  })
})
