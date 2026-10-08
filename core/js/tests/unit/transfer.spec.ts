import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from 'vitest'
import { clearFixture, getFixture } from '../helpers/fixture'
import Transfer from '../../src/transfer'

const item = (value: string, attributes = ''): string => `<div class="list-group-item transfer-item" data-value="${value}" ${attributes}><input type="checkbox" class="form-check-input" /><span>Item ${value}</span></div>`

const markup = (): string =>
  [
    '<div class="transfer" data-bs-toggle="transfer" data-bs-name="picked">',
    '  <div class="card transfer-panel" data-bs-transfer-panel="source">',
    '    <div class="card-header"><input type="checkbox" data-bs-transfer-select-all /><span data-bs-transfer-counter></span></div>',
    '    <input type="search" data-bs-transfer-search />',
    `    <div class="list-group" data-bs-transfer-list>${item('a')}${item('b')}${item('c')}${item('d', 'aria-disabled="true"')}</div>`,
    '  </div>',
    '  <div class="transfer-actions">',
    '    <button type="button" data-bs-transfer-action="add"></button>',
    '    <button type="button" data-bs-transfer-action="remove"></button>',
    '    <button type="button" data-bs-transfer-action="add-all"></button>',
    '    <button type="button" data-bs-transfer-action="remove-all"></button>',
    '    <button type="button" data-bs-transfer-action="up"></button>',
    '    <button type="button" data-bs-transfer-action="down"></button>',
    '  </div>',
    '  <div class="card transfer-panel" data-bs-transfer-panel="target">',
    '    <div class="card-header"><span data-bs-transfer-counter></span></div>',
    `    <div class="list-group" data-bs-transfer-list>${item('e')}</div>`,
    '  </div>',
    '</div>',
  ].join('')

describe('Transfer', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  beforeEach(() => {
    fixtureEl.innerHTML = markup()
  })

  afterEach(() => {
    clearFixture()
    vi.restoreAllMocks()
  })

  const root = (): HTMLElement => fixtureEl.querySelector('.transfer')!
  const rows = (side: 'source' | 'target'): HTMLElement[] => Array.from(fixtureEl.querySelectorAll(`[data-bs-transfer-panel="${side}"] .transfer-item`))
  const values = (side: 'source' | 'target'): string[] => rows(side).map((row) => row.dataset.value!)
  const row = (value: string): HTMLElement => fixtureEl.querySelector(`[data-value="${value}"]`)!
  const button = (action: string): HTMLButtonElement => fixtureEl.querySelector(`[data-bs-transfer-action="${action}"]`)!
  const select = (): HTMLSelectElement => fixtureEl.querySelector('select')!
  const selectedOptions = (): string[] => Array.from(select().selectedOptions, (option) => option.value)

  describe('NAME', () => {
    it('should return the plugin name', () => {
      expect(Transfer.NAME).toBe('transfer')
    })
  })

  describe('constructor', () => {
    it('should set up the listbox semantics', () => {
      const transfer = new Transfer(root())
      expect(transfer.getValue()).toEqual(['e'])
      expect(fixtureEl.querySelector('[data-bs-transfer-list]')!.getAttribute('role')).toBe('listbox')
      expect(fixtureEl.querySelector('[data-bs-transfer-list]')!.getAttribute('aria-multiselectable')).toBe('true')
      expect(row('a').getAttribute('role')).toBe('option')
    })

    it('should render a hidden select from the name option and sync it', () => {
      new Transfer(root())
      expect(select().name).toBe('picked')
      expect(select().hidden).toBe(true)
      expect(selectedOptions()).toEqual(['e'])
    })

    it('should fill the counters and disable the buttons without a selection', () => {
      new Transfer(root())
      expect(fixtureEl.querySelector('[data-bs-transfer-counter]')!.textContent).toBe('0 / 4')
      expect(button('add').disabled).toBe(true)
      expect(button('add-all').disabled).toBe(false)
    })
  })

  describe('selecting rows', () => {
    it('should toggle a row on click and enable the add button', () => {
      new Transfer(root())
      row('a').click()
      expect(row('a').getAttribute('aria-selected')).toBe('true')
      expect(button('add').disabled).toBe(false)
      expect(fixtureEl.querySelector('[data-bs-transfer-counter]')!.textContent).toBe('1 / 4')
      row('a').click()
      expect(row('a').getAttribute('aria-selected')).toBe('false')
    })

    it('should ignore a disabled row', () => {
      new Transfer(root())
      row('d').click()
      expect(row('d').getAttribute('aria-selected')).toBe('false')
    })

    it('should select the visible rows with the select-all checkbox', () => {
      new Transfer(root())
      const all = fixtureEl.querySelector<HTMLInputElement>('[data-bs-transfer-select-all]')!
      all.checked = true
      all.dispatchEvent(new Event('change', { bubbles: true }))
      expect(['a', 'b', 'c'].every((value) => row(value).getAttribute('aria-selected') === 'true')).toBe(true)
      expect(row('d').getAttribute('aria-selected')).toBe('false')
      expect(all.checked).toBe(true)
    })

    it('should filter rows by the search field', () => {
      new Transfer(root())
      const search = fixtureEl.querySelector<HTMLInputElement>('[data-bs-transfer-search]')!
      search.value = 'item b'
      search.dispatchEvent(new Event('input', { bubbles: true }))
      expect(row('a').hidden).toBe(true)
      expect(row('b').hidden).toBe(false)
    })
  })

  describe('moving rows', () => {
    it('should move the selected rows with the add button and fire change.bs.transfer', () => {
      const transfer = new Transfer(root())
      const spy = vi.fn()
      root().addEventListener('change.bs.transfer', spy)
      row('a').click()
      row('c').click()
      button('add').click()

      expect(values('target')).toEqual(['e', 'a', 'c'])
      expect(values('source')).toEqual(['b', 'd'])
      expect(transfer.getValue()).toEqual(['e', 'a', 'c'])
      expect(selectedOptions()).toEqual(['e', 'a', 'c'])
      expect(spy).toHaveBeenCalledTimes(1)
      const event = spy.mock.calls[0][0] as Event & { value: string[]; moved: string[]; direction: string }
      expect(event.value).toEqual(['e', 'a', 'c'])
      expect(event.moved).toEqual(['a', 'c'])
      expect(event.direction).toBe('add')
    })

    it('should send a row back to its original place', () => {
      const transfer = new Transfer(root())
      transfer.add(['b'])
      transfer.add(['a'])
      transfer.remove(['b'])
      expect(values('source')).toEqual(['b', 'c', 'd'])
    })

    it('should move every enabled row with add-all and remove-all', () => {
      const transfer = new Transfer(root())
      button('add-all').click()
      expect(values('target')).toEqual(['e', 'a', 'b', 'c'])
      expect(values('source')).toEqual(['d'])
      button('remove-all').click()
      expect(transfer.getValue()).toEqual([])
      expect(values('source')).toEqual(['a', 'b', 'c', 'd', 'e'])
    })

    it('should fire a change event on the select', () => {
      const transfer = new Transfer(root())
      const spy = vi.fn()
      select().addEventListener('change', spy)
      transfer.add(['a'])
      expect(spy).toHaveBeenCalledTimes(1)
    })

    it('should not fire anything when nothing moves', () => {
      const transfer = new Transfer(root())
      const spy = vi.fn()
      root().addEventListener('change.bs.transfer', spy)
      transfer.add(['unknown'])
      expect(spy).not.toHaveBeenCalled()
    })
  })

  describe('reordering', () => {
    it('should move the selected target rows up and down', () => {
      const transfer = new Transfer(root())
      transfer.add(['a', 'b'])
      expect(transfer.getValue()).toEqual(['e', 'a', 'b'])

      row('b').click()
      button('up').click()
      expect(transfer.getValue()).toEqual(['e', 'b', 'a'])
      expect(selectedOptions()).toEqual(['e', 'b', 'a'])

      button('down').click()
      expect(transfer.getValue()).toEqual(['e', 'a', 'b'])
    })
  })

  describe('setValue', () => {
    it('should put exactly the given values in the target list', () => {
      const transfer = new Transfer(root())
      transfer.setValue(['c', 'a'])
      expect(transfer.getValue()).toEqual(['c', 'a'])
      expect(values('source')).toEqual(['b', 'd', 'e'])
    })
  })

  describe('keyboard', () => {
    const press = (target: HTMLElement, key: string, init: KeyboardEventInit = {}): void => {
      target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true, ...init }))
    }

    it('should toggle a row with space and move focus with the arrow keys', () => {
      new Transfer(root())
      row('a').focus()
      press(row('a'), ' ')
      expect(row('a').getAttribute('aria-selected')).toBe('true')

      press(row('a'), 'ArrowDown')
      expect(document.activeElement).toBe(row('b'))
      expect(row('b').tabIndex).toBe(0)
      expect(row('a').tabIndex).toBe(-1)
    })

    it('should select every row with Ctrl+A', () => {
      new Transfer(root())
      row('a').focus()
      press(row('a'), 'a', { ctrlKey: true })
      expect(['a', 'b', 'c'].every((value) => row(value).getAttribute('aria-selected') === 'true')).toBe(true)
    })
  })

  describe('dispose', () => {
    it('should remove the instance and stop reacting', () => {
      const transfer = new Transfer(root())
      transfer.dispose()
      expect(Transfer.getInstance(root())).toBeNull()
      row('a').click()
      expect(row('a').getAttribute('aria-selected')).toBe('false')
    })
  })
})
