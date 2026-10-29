import { describe, it, expect, beforeAll, beforeEach, afterEach } from 'vitest'
import { clearFixture, getFixture } from '../helpers/fixture'
import SelectAll from '../../src/select-all'

const markup = (rows: string[] = ['', '', '']): string =>
  [
    '<div data-bs-toggle="select-all">',
    '  <span data-bs-select-all-count></span> of <span data-bs-select-all-total></span>',
    '  <table class="table table-selectable">',
    '    <thead><tr><th><input type="checkbox" class="form-check-input table-selectable-check" data-bs-select-all-check /></th></tr></thead>',
    '    <tbody>',
    ...rows.map((attributes) => `<tr><td><input type="checkbox" class="form-check-input table-selectable-check" ${attributes} /></td></tr>`),
    '    </tbody>',
    '  </table>',
    '</div>',
  ].join('')

describe('SelectAll', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  beforeEach(() => {
    fixtureEl.innerHTML = markup()
  })

  afterEach(() => {
    clearFixture()
  })

  const element = (): HTMLElement => fixtureEl.querySelector('[data-bs-toggle="select-all"]')!
  const check = (): HTMLInputElement => fixtureEl.querySelector('[data-bs-select-all-check]')!
  const items = (): HTMLInputElement[] => [...fixtureEl.querySelectorAll<HTMLInputElement>('tbody input')]
  const count = (): string => fixtureEl.querySelector('[data-bs-select-all-count]')!.textContent!
  const total = (): string => fixtureEl.querySelector('[data-bs-select-all-total]')!.textContent!

  describe('NAME', () => {
    it('should return the plugin name', () => {
      expect(SelectAll.NAME).toBe('selectAll')
    })
  })

  describe('constructor', () => {
    it('should fill the counters', () => {
      fixtureEl.innerHTML = markup(['checked', '', ''])
      new SelectAll(element())

      expect(count()).toBe('1')
      expect(total()).toBe('3')
      expect(check().indeterminate).toBe(true)
    })

    it('should check the "select all" checkbox when every item is checked', () => {
      fixtureEl.innerHTML = markup(['checked', 'checked'])
      new SelectAll(element())

      expect(check().checked).toBe(true)
      expect(check().indeterminate).toBe(false)
    })
  })

  describe('"select all" checkbox', () => {
    it('should check and uncheck every item', () => {
      new SelectAll(element())

      check().click()
      expect(items().every((item) => item.checked)).toBe(true)
      expect(count()).toBe('3')

      check().click()
      expect(items().some((item) => item.checked)).toBe(false)
      expect(count()).toBe('0')
    })

    it('should skip disabled items', () => {
      fixtureEl.innerHTML = markup(['', 'disabled', ''])
      new SelectAll(element())

      check().click()
      expect(items().map((item) => item.checked)).toEqual([true, false, true])
      expect(check().checked).toBe(true)
    })

    it('should be disabled when there is nothing to select', () => {
      fixtureEl.innerHTML = markup([])
      new SelectAll(element())

      expect(check().disabled).toBe(true)
    })

    it('should fire change on the items it changes', () => {
      fixtureEl.innerHTML = markup(['checked', '', ''])
      new SelectAll(element())
      const changed: EventTarget[] = []
      element().addEventListener('change', (event) => changed.push(event.target!))

      check().click()
      expect(changed).toHaveLength(3)
      expect(changed).toEqual(expect.arrayContaining([check(), items()[1], items()[2]]))
    })
  })

  describe('items', () => {
    it('should turn the "select all" checkbox indeterminate', () => {
      new SelectAll(element())

      items()[0].click()
      expect(check().indeterminate).toBe(true)
      expect(check().checked).toBe(false)

      items()[1].click()
      items()[2].click()
      expect(check().indeterminate).toBe(false)
      expect(check().checked).toBe(true)
    })

    it('should pick up rows added later', () => {
      new SelectAll(element())
      fixtureEl.querySelector('tbody')!.insertAdjacentHTML('beforeend', '<tr><td><input type="checkbox" class="table-selectable-check" /></td></tr>')

      items()[3].click()
      expect(count()).toBe('1')
      expect(total()).toBe('4')
    })

    it('should refresh when rows are added to an empty table', async () => {
      fixtureEl.innerHTML = markup([])
      new SelectAll(element())
      expect(check().disabled).toBe(true)

      fixtureEl.querySelector('tbody')!.insertAdjacentHTML('beforeend', '<tr><td><input type="checkbox" class="table-selectable-check" /></td></tr>')
      await Promise.resolve()

      expect(check().disabled).toBe(false)
      expect(total()).toBe('1')
    })

    it('should refresh when rows are removed', async () => {
      fixtureEl.innerHTML = markup(['checked', 'checked', ''])
      new SelectAll(element())

      fixtureEl.querySelector('tbody tr:last-child')!.remove()
      await Promise.resolve()

      expect(count()).toBe('2')
      expect(total()).toBe('2')
      expect(check().checked).toBe(true)
    })

    it('should check a range with shift-click', () => {
      fixtureEl.innerHTML = markup(['', '', '', ''])
      new SelectAll(element())

      items()[0].click()
      items()[3].dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, shiftKey: true }))
      expect(items().every((item) => item.checked)).toBe(true)
      expect(count()).toBe('4')
    })

    it('should not check a range when range is off', () => {
      fixtureEl.innerHTML = markup(['', '', '', ''])
      new SelectAll(element(), { range: false })

      items()[0].click()
      items()[3].dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, shiftKey: true }))
      expect(items().map((item) => item.checked)).toEqual([true, false, false, true])
    })
  })

  describe('events', () => {
    it('should trigger change.bs.selectAll with the selection', () => {
      new SelectAll(element())
      let detail: { count?: number; total?: number; selected?: HTMLInputElement[] } = {}
      element().addEventListener('change.bs.selectAll', (event) => {
        detail = event as unknown as typeof detail
      })

      items()[1].click()
      expect(detail.count).toBe(1)
      expect(detail.total).toBe(3)
      expect(detail.selected).toEqual([items()[1]])
    })

    it('should trigger change.bs.selectAll once per shift-click', () => {
      fixtureEl.innerHTML = markup(['', '', '', ''])
      new SelectAll(element())
      items()[0].click()
      const counts: number[] = []
      element().addEventListener('change.bs.selectAll', (event) => counts.push((event as unknown as { count: number }).count))

      items()[3].dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, shiftKey: true }))
      expect(counts).toEqual([4])
    })
  })

  describe('methods', () => {
    it('should select and deselect all', () => {
      const selectAll = new SelectAll(element())

      selectAll.selectAll()
      expect(selectAll.getSelected()).toHaveLength(3)
      expect(check().checked).toBe(true)

      selectAll.deselectAll()
      expect(selectAll.getSelected()).toHaveLength(0)
    })

    it('should refresh on update()', () => {
      const selectAll = new SelectAll(element())
      items()[0].checked = true

      selectAll.update()
      expect(count()).toBe('1')
    })

    it('should stop listening on dispose()', () => {
      const selectAll = new SelectAll(element())
      selectAll.dispose()

      check().click()
      expect(items().some((item) => item.checked)).toBe(false)
    })
  })
})
