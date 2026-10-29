import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest'
import Alert from '../../src/bootstrap/alert'
import Collapse from '../../src/bootstrap/collapse'
import Dropdown from '../../src/bootstrap/dropdown'
import EventHandler from '../../src/bootstrap/dom/event-handler'
import Modal from '../../src/bootstrap/modal'
import Offcanvas from '../../src/bootstrap/offcanvas'
import Tab from '../../src/bootstrap/tab'
import Toast from '../../src/bootstrap/toast'
import Tooltip from '../../src/bootstrap/tooltip'
import { clearBodyAndDocument, clearFixture, getFixture } from '../helpers/fixture'

const settlesWithin = (promise: Promise<void>, ms = 200): Promise<boolean> => Promise.race([promise.then(() => true), new Promise<boolean>((resolve) => setTimeout(() => resolve(false), ms))])

describe('transition promises', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  afterEach(() => {
    clearFixture()
    clearBodyAndDocument()
    vi.restoreAllMocks()
    document.body.classList.remove('modal-open')
    for (const el of document.querySelectorAll('.modal-backdrop, .tooltip, .popover')) {
      el.remove()
    }
  })

  it('Alert#close resolves after the alert is removed', async () => {
    fixtureEl.innerHTML = '<div class="alert fade show"></div>'
    const el = fixtureEl.querySelector<HTMLElement>('.alert')!

    await new Alert(el).close()

    expect(fixtureEl.querySelector('.alert')).toBeNull()
  })

  it('Alert#close resolves when close.bs.alert is prevented', async () => {
    fixtureEl.innerHTML = '<div class="alert fade show"></div>'
    const el = fixtureEl.querySelector<HTMLElement>('.alert')!
    EventHandler.on(el, 'close.bs.alert', (event: Event) => event.preventDefault())

    await new Alert(el).close()

    expect(fixtureEl.querySelector('.alert')).not.toBeNull()
  })

  it('Collapse show, hide and toggle resolve after the transition', async () => {
    fixtureEl.innerHTML = '<div class="collapse"></div>'
    const el = fixtureEl.querySelector<HTMLElement>('.collapse')!
    const collapse = new Collapse(el, { toggle: false })

    await collapse.show()
    expect(el.classList.contains('show')).toBe(true)

    await collapse.hide()
    expect(el.classList.contains('show')).toBe(false)

    await collapse.toggle()
    expect(el.classList.contains('show')).toBe(true)
  })

  it('Collapse#show resolves when the collapse is already shown', async () => {
    fixtureEl.innerHTML = '<div class="collapse show"></div>'
    const collapse = new Collapse(fixtureEl.querySelector<HTMLElement>('.collapse')!, { toggle: false })

    await expect(collapse.show()).resolves.toBeUndefined()
  })

  it('Dropdown show and hide resolve', async () => {
    fixtureEl.innerHTML = '<div class="dropdown"><button data-bs-toggle="dropdown">Open</button><div class="dropdown-menu"></div></div>'
    const dropdown = new Dropdown(fixtureEl.querySelector<HTMLElement>('button')!)

    await dropdown.show()
    expect(fixtureEl.querySelector('.dropdown-menu')!.classList.contains('show')).toBe(true)

    await dropdown.hide()
    expect(fixtureEl.querySelector('.dropdown-menu')!.classList.contains('show')).toBe(false)
  })

  it('Modal show and hide resolve after shown and hidden', async () => {
    fixtureEl.innerHTML = '<div class="modal fade"><div class="modal-dialog"></div></div>'
    const el = fixtureEl.querySelector<HTMLElement>('.modal')!
    const modal = new Modal(el)
    const events: string[] = []
    EventHandler.on(el, 'shown.bs.modal', () => events.push('shown'))
    EventHandler.on(el, 'hidden.bs.modal', () => events.push('hidden'))

    await modal.show()
    expect(events).toEqual(['shown'])

    await modal.hide()
    expect(events).toEqual(['shown', 'hidden'])
    expect(document.querySelector('.modal-backdrop')).toBeNull()
  })

  it('Modal#toggle returns a promise', async () => {
    fixtureEl.innerHTML = '<div class="modal"><div class="modal-dialog"></div></div>'
    const modal = new Modal(fixtureEl.querySelector<HTMLElement>('.modal')!)

    await modal.toggle()
    await modal.toggle()

    expect(fixtureEl.querySelector('.modal')!.classList.contains('show')).toBe(false)
  })

  it('Modal#show resolves when the modal is disposed while the backdrop opens', async () => {
    fixtureEl.innerHTML = '<div class="modal fade"><div class="modal-dialog"></div></div>'
    const modal = new Modal(fixtureEl.querySelector<HTMLElement>('.modal')!)
    const backdrop = modal._backdrop
    const show = backdrop.show.bind(backdrop)
    vi.spyOn(backdrop, 'show').mockImplementation((callback) => {
      modal.dispose()
      show(callback)
    })

    expect(await settlesWithin(modal.show())).toBe(true)
  })

  it('Modal#hide resolves when the modal is disposed while the backdrop closes', async () => {
    fixtureEl.innerHTML = '<div class="modal fade"><div class="modal-dialog"></div></div>'
    const el = fixtureEl.querySelector<HTMLElement>('.modal')!
    const modal = new Modal(el)
    await modal.show()
    const backdrop = modal._backdrop
    const hide = backdrop.hide.bind(backdrop)
    vi.spyOn(backdrop, 'hide').mockImplementation((callback) => {
      modal.dispose()
      hide(callback)
    })

    expect(await settlesWithin(modal.hide())).toBe(true)
    expect(document.body.classList.contains('modal-open')).toBe(false)
  })

  it('Offcanvas show and hide resolve after shown and hidden', async () => {
    fixtureEl.innerHTML = '<div class="offcanvas"></div>'
    const el = fixtureEl.querySelector<HTMLElement>('.offcanvas')!
    const offcanvas = new Offcanvas(el)

    await offcanvas.show()
    expect(el.classList.contains('show')).toBe(true)

    await offcanvas.hide()
    expect(el.classList.contains('show')).toBe(false)
  })

  it('Tab#show resolves after both panes switched', async () => {
    fixtureEl.innerHTML = [
      '<ul class="nav" role="tablist">',
      '<li><button class="nav-link active" data-bs-target="#a" role="tab">A</button></li>',
      '<li><button class="nav-link" data-bs-target="#b" role="tab">B</button></li>',
      '</ul>',
      '<div class="tab-content"><div class="tab-pane fade show active" id="a"></div><div class="tab-pane fade" id="b"></div></div>',
    ].join('')
    const [, second] = Array.from(fixtureEl.querySelectorAll<HTMLElement>('.nav-link'))

    await new Tab(second).show()

    expect(second.classList.contains('active')).toBe(true)
    expect(fixtureEl.querySelector('#b')!.classList.contains('show')).toBe(true)
    expect(fixtureEl.querySelector('#a')!.classList.contains('show')).toBe(false)
  })

  it('Tab#show resolves after the new pane finishes fading in', async () => {
    fixtureEl.innerHTML = [
      '<style>.fade { transition: opacity 50ms linear } .fade:not(.show) { opacity: 0 }</style>',
      '<ul class="nav" role="tablist">',
      '<li><button class="nav-link active" data-bs-target="#a" role="tab">A</button></li>',
      '<li><button class="nav-link" data-bs-target="#b" role="tab">B</button></li>',
      '</ul>',
      '<div class="tab-content"><div class="tab-pane fade show active" id="a"></div><div class="tab-pane fade" id="b"></div></div>',
    ].join('')
    const [, second] = Array.from(fixtureEl.querySelectorAll<HTMLElement>('.nav-link'))
    const pane = fixtureEl.querySelector<HTMLElement>('#b')!
    let fadeInEnded = false
    pane.addEventListener('transitionend', () => {
      fadeInEnded ||= pane.classList.contains('show')
    })

    await new Tab(second).show()

    expect(fadeInEnded).toBe(true)
  })

  it('Toast show and hide resolve', async () => {
    fixtureEl.innerHTML = '<div class="toast"></div>'
    const el = fixtureEl.querySelector<HTMLElement>('.toast')!
    const toast = new Toast(el, { autohide: false })

    await toast.show()
    expect(el.classList.contains('show')).toBe(true)

    await toast.hide()
    expect(el.classList.contains('show')).toBe(false)
  })

  it.each([true, false])('Toast#show resolves when the toast is disposed in shown.bs.toast (animation: %s)', async (animation) => {
    fixtureEl.innerHTML = '<div class="toast"></div>'
    const el = fixtureEl.querySelector<HTMLElement>('.toast')!
    const toast = new Toast(el, { animation })
    EventHandler.on(el, 'shown.bs.toast', () => toast.dispose())

    expect(await settlesWithin(toast.show())).toBe(true)
    expect(Toast.getInstance(el)).toBeNull()
  })

  it('Tooltip show and hide resolve', async () => {
    fixtureEl.innerHTML = '<a href="#" title="tip">Tip</a>'
    const tooltip = new Tooltip(fixtureEl.querySelector<HTMLElement>('a')!)

    await tooltip.show()
    expect(tooltip.tip!.classList.contains('show')).toBe(true)

    await tooltip.hide()
    expect(document.querySelector('.tooltip.show')).toBeNull()
  })

  it('Tooltip#toggle resolves', async () => {
    fixtureEl.innerHTML = '<a href="#" title="tip">Tip</a>'
    const tooltip = new Tooltip(fixtureEl.querySelector<HTMLElement>('a')!)

    await tooltip.toggle()
    expect(tooltip.tip!.classList.contains('show')).toBe(true)
  })

  it('Tooltip#toggle resolves when the trigger is hidden during the show delay', async () => {
    fixtureEl.innerHTML = '<a href="#" title="tip">Tip</a>'
    const el = fixtureEl.querySelector<HTMLElement>('a')!
    const tooltip = new Tooltip(el, { delay: { show: 20, hide: 0 } })
    const onError = vi.fn((event: ErrorEvent) => event.preventDefault())
    window.addEventListener('error', onError)

    const toggled = tooltip.toggle()
    el.style.display = 'none'

    expect(await settlesWithin(toggled)).toBe(true)
    expect(onError).toHaveBeenCalledOnce()
    window.removeEventListener('error', onError)
  })
})
