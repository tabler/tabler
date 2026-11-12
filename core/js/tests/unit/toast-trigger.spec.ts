import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest'
import Toast from '../../src/bootstrap/toast'
import { clearFixture, getFixture } from '../helpers/fixture'

import '../../src/toast'

describe('toast trigger', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    clearFixture()
  })

  const toastEl = (): HTMLElement => fixtureEl.querySelector('.toast')!
  const click = (selector: string): MouseEvent => {
    const event = new MouseEvent('click', { bubbles: true, cancelable: true })
    fixtureEl.querySelector(selector)!.dispatchEvent(event)
    return event
  }

  it('shows the toast and does not follow a link trigger', () => {
    fixtureEl.innerHTML = '<a href="#toast" data-bs-toggle="toast">Show</a><div class="toast" id="toast"></div>'
    const show = vi.spyOn(Toast.prototype, 'show')

    expect(click('a').defaultPrevented).toBe(true)
    expect(show).toHaveBeenCalledTimes(1)
    expect(Toast.getInstance(toastEl())).not.toBeNull()
  })

  it('uses the current instance after the toast is created again', () => {
    fixtureEl.innerHTML = '<button type="button" data-bs-toggle="toast" data-bs-target="#toast">Show</button><div class="toast" id="toast"></div>'
    click('button')
    const instance = new Toast(toastEl(), { delay: 10_000 })
    const show = vi.spyOn(instance, 'show')

    click('button')
    expect(show).toHaveBeenCalledTimes(1)
  })

  it('works for a trigger added later and for the data-tblr-toggle alias', () => {
    fixtureEl.innerHTML = '<div class="toast" id="toast"></div>'
    fixtureEl.insertAdjacentHTML('beforeend', '<button type="button" data-tblr-toggle="toast" data-bs-target="#toast"><span>Show</span></button>')
    const show = vi.spyOn(Toast.prototype, 'show')

    click('button span')
    expect(show).toHaveBeenCalledTimes(1)
  })

  it('ignores a disabled trigger and a trigger without a target', () => {
    fixtureEl.innerHTML = ['<button type="button" class="disabled" data-bs-toggle="toast" data-bs-target="#toast">Show</button>', '<button type="button" id="lost" data-bs-toggle="toast" data-bs-target="#missing">Show</button>', '<div class="toast" id="toast"></div>'].join('')
    const show = vi.spyOn(Toast.prototype, 'show')

    click('button.disabled')
    expect(() => click('#lost')).not.toThrow()
    expect(show).not.toHaveBeenCalled()
  })
})
