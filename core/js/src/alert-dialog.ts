import { Modal } from './bootstrap'

const VARIANTS = ['primary', 'secondary', 'success', 'info', 'warning', 'danger'] as const

export type AlertDialogOptions = {
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
  variant?: (typeof VARIANTS)[number]
  focus?: 'confirm' | 'cancel'
  icon?: string | Element
  align?: 'center' | 'start'
}

const ICONS: Record<string, string> = {
  'trash': 'M4 7h16M10 11v6M14 11v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3',
  'alert-triangle': 'M12 9v4M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636-2.87l-8.106-13.536a1.914 1.914 0 0 0-3.274 0M12 16h.01',
  'circle-check': 'M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0M9 12l2 2l4-4',
  'info-circle': 'M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0M12 9h.01M11 12h1v4h1',
  'help-circle': 'M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0M12 16v.01M12 13a2 2 0 0 0 .914-3.782a1.98 1.98 0 0 0-2.414.483',
}

const SVG_NS = 'http://www.w3.org/2000/svg'

const createIcon = (icon: string | Element, variant: string): HTMLElement => {
  const badge = document.createElement('span')
  badge.className = 'avatar avatar-lg flex-shrink-0'
  badge.classList.add(`bg-${variant}-lt`)

  if (icon instanceof Element) {
    badge.append(icon.cloneNode(true))
    return badge
  }

  const svg = document.createElementNS(SVG_NS, 'svg')
  const path = document.createElementNS(SVG_NS, 'path')
  const attributes = { 'class': 'icon icon-lg', 'width': '24', 'height': '24', 'viewBox': '0 0 24 24', 'fill': 'none', 'stroke': 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }
  for (const [name, value] of Object.entries(attributes)) {
    svg.setAttribute(name, value)
  }
  path.setAttribute('d', ICONS[icon] ?? '')
  svg.append(path)
  badge.append(svg)
  return badge
}

let counter = 0
let queue: Promise<unknown> = Promise.resolve()

const waitForOpenModal = (): Promise<void> =>
  new Promise((resolve) => {
    const openModal = document.querySelector('.modal.show')
    if (!openModal) {
      resolve()
      return
    }
    openModal.addEventListener('hidden.bs.modal', () => resolve(), { once: true })
  })

const show = (input: string | AlertDialogOptions, withCancel: boolean): Promise<boolean> =>
  new Promise((resolve) => {
    const { title = withCancel ? 'Are you sure?' : 'Notice', message = '', confirmText = 'OK', cancelText = 'Cancel', variant = 'primary', focus = 'confirm', icon = '', align = 'center' } = typeof input === 'string' ? { title: input } : input
    const color = VARIANTS.includes(variant) ? variant : 'primary'
    const id = `tblr-alert-dialog-${++counter}`
    const root = document.createElement('div')
    const start = align === 'start'
    const btn = start ? 'btn' : 'btn w-100'
    const col = start ? 'col-auto' : 'col'
    const cancel = withCancel ? `<div class="${col}"><button type="button" class="${btn}" data-cancel></button></div>` : ''
    const opener = document.activeElement as HTMLElement | null

    root.className = 'modal modal-blur fade'
    root.tabIndex = -1
    root.setAttribute('aria-labelledby', `${id}-title`)
    root.setAttribute('aria-describedby', `${id}-description`)
    root.innerHTML = `<div class="modal-dialog ${start ? '' : 'modal-sm '}modal-dialog-centered" style="transition-duration: 0.15s"><div class="modal-content"><div class="modal-body py-4 ${start ? 'd-flex gap-3' : 'text-center'}">${start ? '<div>' : ''}<h3 id="${id}-title"></h3><div id="${id}-description" class="text-secondary"></div>${start ? '</div>' : ''}</div><div class="modal-footer" style="--tblr-modal-footer-padding-y: 0.375rem"><div class="row gx-2 ${start ? 'ms-auto' : 'w-100'}">${cancel}<div class="${col}"><button type="button" class="${btn}" data-confirm></button></div></div></div></div></div>`

    const set = (selector: string, text: string) => {
      root.querySelector(selector)!.textContent = text
    }
    set('h3', title)
    set(`#${id}-description`, message)
    set('[data-confirm]', confirmText)
    root.querySelector('[data-confirm]')!.classList.add(`btn-${color}`)
    if (withCancel) {
      set('[data-cancel]', cancelText)
    }

    if (icon) {
      const badge = createIcon(icon, color)
      const body = root.querySelector('.modal-body')!
      if (start) {
        body.prepend(badge)
      } else {
        const wrapper = document.createElement('div')
        wrapper.className = 'mb-3'
        wrapper.append(badge)
        body.prepend(wrapper)
      }
    }

    document.body.append(root)

    const modal = new Modal(root, { backdrop: 'static', keyboard: true })
    let result = false
    let isShown = false
    let dismissRequested = false

    const dismiss = () => {
      if (isShown) {
        modal.hide()
      } else {
        dismissRequested = true
      }
    }

    root.addEventListener('click', (event) => {
      const button = (event.target as Element).closest<HTMLElement>('[data-confirm], [data-cancel]')
      if (button) {
        result = 'confirm' in button.dataset
        dismiss()
      }
    })
    root.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        dismiss()
      }
    })
    root.addEventListener('shown.bs.modal', () => {
      isShown = true
      root.setAttribute('role', 'alertdialog')
      root.querySelector<HTMLElement>(focus === 'cancel' ? '[data-cancel]' : '[data-confirm]')?.focus()
      if (dismissRequested) {
        modal.hide()
      }
    })
    root.addEventListener('hidden.bs.modal', () => {
      modal.dispose()
      root.remove()
      if (opener?.isConnected) {
        opener.focus()
      }
      resolve(result)
    })

    modal.show()
  })

const open = (input: string | AlertDialogOptions, withCancel: boolean): Promise<boolean> => {
  const result = queue.then(waitForOpenModal).then(() => show(input, withCancel))
  queue = result.catch(() => undefined)
  return result
}

// js-docs-start alert-dialog-init
const AlertDialog = {
  confirm: (options: string | AlertDialogOptions): Promise<boolean> => open(options, true),
  alert: async (options: string | AlertDialogOptions): Promise<void> => {
    await open(options, false)
  },
}
// js-docs-end alert-dialog-init

export default AlertDialog
