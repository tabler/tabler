import { describe, it, expect, afterEach } from 'vitest'
import AlertDialog from '../../src/alert-dialog'

const waitFor = async (selector: string): Promise<HTMLElement> => {
  for (let i = 0; i < 100; i++) {
    const el = document.querySelector<HTMLElement>(selector)
    if (el) return el
    await new Promise((r) => setTimeout(r, 20))
  }
  throw new Error(`missing ${selector}`)
}

const shown = async () => {
  const el = await waitFor('.modal.show')
  await new Promise((r) => setTimeout(r, 400))
  return el
}

describe('AlertDialog', () => {
  afterEach(() => {
    document.body.innerHTML = ''
    document.body.className = ''
  })

  it('confirm resolves true on confirm click', async () => {
    const promise = AlertDialog.confirm({ title: 'Delete?', message: '<b>x</b>', confirmText: 'Delete', variant: 'danger' })
    const el = await shown()
    expect(el.getAttribute('role')).toBe('alertdialog')
    expect(el.querySelector('b')).toBeNull()
    expect(el.querySelector('.btn-danger')?.textContent).toBe('Delete')
    el.querySelector<HTMLElement>('[data-confirm]')!.click()
    expect(await promise).toBe(true)
    expect(document.querySelector('.modal')).toBeNull()
  })

  it('confirm resolves false on cancel and on Escape', async () => {
    const first = AlertDialog.confirm('Sure?')
    const el = await shown()
    el.querySelector<HTMLElement>('[data-cancel]')!.click()
    expect(await first).toBe(false)

    const second = AlertDialog.confirm('Sure?')
    const el2 = await shown()
    el2.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    expect(await second).toBe(false)
  })

  it('does not close on backdrop click', async () => {
    const promise = AlertDialog.confirm('Sure?')
    const el = await shown()
    el.click()
    await new Promise((r) => setTimeout(r, 400))
    expect(document.querySelector('.modal.show')).not.toBeNull()
    el.querySelector<HTMLElement>('[data-cancel]')!.click()
    await promise
  })

  it('alert has a single button', async () => {
    const promise = AlertDialog.alert('Saved')
    const el = await shown()
    expect(el.querySelectorAll('button')).toHaveLength(1)
    el.querySelector('button')!.click()
    await promise
  })

  it('renders a built-in icon and the start layout', async () => {
    const promise = AlertDialog.confirm({ title: 'Delete?', icon: 'trash', variant: 'danger', align: 'start' })
    const el = await shown()
    expect(el.querySelector('.avatar.bg-danger-lt svg path')).not.toBeNull()
    expect(el.querySelector('.modal-body')?.classList.contains('d-flex')).toBe(true)
    expect(el.querySelector('.modal-dialog')?.classList.contains('modal-sm')).toBe(false)
    el.querySelector<HTMLElement>('[data-cancel]')!.click()
    await promise
  })

  it('accepts icon markup', async () => {
    const promise = AlertDialog.alert({ title: 'Hi', icon: '<svg id="custom-icon"></svg>' })
    const el = await shown()
    expect(el.querySelector('#custom-icon')).not.toBeNull()
    el.querySelector('button')!.click()
    await promise
  })
})
