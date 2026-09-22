import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest'
import { clearFixture, getFixture } from '../helpers/fixture'
import EventHandler from '../../src/bootstrap/dom/event-handler'
import Tree from '../../src/tree'

describe('Tree', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  afterEach(() => {
    clearFixture()
  })

  const markup = (childState = ['', '']): string => `
    <ul class="tree" data-bs-toggle="tree">
      <li>
        <details open>
          <summary class="tree-node"><input id="folder" type="checkbox"> Folder</summary>
          <ul class="tree-children">
            <li><label class="tree-node"><input id="a" type="checkbox" ${childState[0]}> A</label></li>
            <li><label class="tree-node"><input id="b" type="checkbox" ${childState[1]}> B</label></li>
          </ul>
        </details>
      </li>
    </ul>`

  const box = (id: string): HTMLInputElement => fixtureEl.querySelector<HTMLInputElement>(`#${id}`)!
  const create = (html: string): Tree => {
    fixtureEl.innerHTML = html
    return new Tree(fixtureEl.querySelector<HTMLElement>('.tree')!)
  }

  describe('NAME', () => {
    it('should return plugin name', () => {
      expect(Tree.NAME).toBe('tree')
    })
  })

  describe('constructor', () => {
    it('should check a folder whose children are all checked', () => {
      create(markup(['checked', 'checked']))

      expect(box('folder').checked).toBe(true)
      expect(box('folder').indeterminate).toBe(false)
    })

    it('should mark a folder with some children checked as indeterminate', () => {
      create(markup(['checked', '']))

      expect(box('folder').checked).toBe(false)
      expect(box('folder').indeterminate).toBe(true)
    })

    it('should leave a folder with no children checked unchecked', () => {
      create(markup())

      expect(box('folder').checked).toBe(false)
      expect(box('folder').indeterminate).toBe(false)
    })
  })

  describe('change', () => {
    it('should check and uncheck every child with the folder', () => {
      create(markup())

      box('folder').click()
      expect(box('a').checked).toBe(true)
      expect(box('b').checked).toBe(true)

      box('folder').click()
      expect(box('a').checked).toBe(false)
      expect(box('b').checked).toBe(false)
    })

    it('should follow the children up to the folder', () => {
      create(markup())

      box('a').click()
      expect(box('folder').indeterminate).toBe(true)

      box('b').click()
      expect(box('folder').checked).toBe(true)
      expect(box('folder').indeterminate).toBe(false)

      box('a').click()
      box('b').click()
      expect(box('folder').checked).toBe(false)
      expect(box('folder').indeterminate).toBe(false)
    })

    it('should reach every ancestor of a nested item', () => {
      fixtureEl.innerHTML = `
        <ul class="tree" data-bs-toggle="tree">
          <li><details open><summary><input id="root" type="checkbox"></summary>
            <ul><li><details open><summary><input id="inner" type="checkbox"></summary>
              <ul><li><input id="leaf" type="checkbox"></li></ul>
            </details></li></ul>
          </details></li>
        </ul>`
      new Tree(fixtureEl.querySelector<HTMLElement>('.tree')!)

      box('leaf').click()

      expect(box('inner').checked).toBe(true)
      expect(box('root').checked).toBe(true)
    })

    it('should reach an always-expanded folder whose checkbox sits in a label', () => {
      fixtureEl.innerHTML = `
        <ul class="tree" data-bs-toggle="tree">
          <li>
            <label class="tree-node"><input id="folder" type="checkbox"> Folder</label>
            <ul class="tree-children">
              <li><label class="tree-node"><input id="a" type="checkbox"> A</label></li>
              <li><label class="tree-node"><input id="b" type="checkbox"> B</label></li>
            </ul>
          </li>
        </ul>`
      new Tree(fixtureEl.querySelector<HTMLElement>('.tree')!)

      box('a').click()
      expect(box('folder').indeterminate).toBe(true)

      box('b').click()
      expect(box('folder').checked).toBe(true)
      expect(box('folder').indeterminate).toBe(false)
    })

    it('should ignore a folder without a checkbox', () => {
      fixtureEl.innerHTML = `
        <ul class="tree" data-bs-toggle="tree">
          <li><details open><summary>Folder</summary>
            <ul><li><input id="leaf" type="checkbox"></li></ul>
          </details></li>
        </ul>`
      new Tree(fixtureEl.querySelector<HTMLElement>('.tree')!)

      expect(() => box('leaf').click()).not.toThrow()
      expect(box('leaf').checked).toBe(true)
    })

    it('should fire changed.bs.tree with the clicked checkbox and the checked list, after the cascade settles', () => {
      const tree = create(markup())
      const spy = vi.fn()
      EventHandler.on(fixtureEl.querySelector('.tree')!, 'changed.bs.tree', spy)

      box('a').click()

      expect(spy).toHaveBeenCalledTimes(1)
      const event = spy.mock.calls[0][0] as CustomEvent
      expect(event.relatedTarget).toBe(box('a'))
      expect(event.checked).toEqual([box('a')])
    })
  })

  describe('disabled', () => {
    it('should leave a disabled child alone and ignore it when checking the folder', () => {
      create(markup().replace('id="b" type="checkbox"', 'id="b" type="checkbox" disabled'))

      box('folder').click()
      expect(box('a').checked).toBe(true)
      expect(box('b').checked).toBe(false)
      expect(box('folder').checked).toBe(true)
      expect(box('folder').indeterminate).toBe(false)
    })
  })

  describe('checked', () => {
    it('should list the checked checkboxes', () => {
      const tree = create(markup(['checked', '']))

      expect(tree.checked.map((input) => input.id)).toEqual(['a'])
    })
  })
})
