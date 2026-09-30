import { Modal } from './bootstrap'

export type AlertDialogOptions = {
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
  variant?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger'
  focus?: 'confirm' | 'cancel'
  icon?: string
  align?: 'center' | 'start'
}

const ICONS: Record<string, string> = {
  'trash': 'M4 7h16M10 11v6M14 11v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3',
  'alert-triangle': 'M12 9v4M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636-2.87l-8.106-13.536a1.914 1.914 0 0 0-3.274 0M12 16h.01',
  'circle-check': 'M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0M9 12l2 2l4-4',
  'info-circle': 'M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0M12 9h.01M11 12h1v4h1',
  'help-circle': 'M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0M12 16v.01M12 13a2 2 0 0 0 .914-3.782a1.98 1.98 0 0 0-2.414.483',
}

const iconHtml = (icon: string, variant: string): string => {
  const svg = icon.startsWith('<') ? icon : `<svg class="icon icon-lg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${ICONS[icon] ?? ''}"/></svg>`
  return `<span class="avatar avatar-lg bg-${variant}-lt flex-shrink-0">${svg}</span>`
}

let counter = 0

const open = (input: string | AlertDialogOptions, withCancel: boolean): Promise<boolean> =>
  new Promise((resolve) => {
    const { title = withCancel ? 'Are you sure?' : 'Notice', message = '', confirmText = 'OK', cancelText = 'Cancel', variant = 'primary', focus = 'confirm', icon = '', align = 'center' } = typeof input === 'string' ? { title: input } : input
    const id = `tblr-alert-dialog-${++counter}`
    const root = document.createElement('div')
    const start = align === 'start'
    const media = icon ? iconHtml(icon, variant) : ''
    const text = `<h3 id="${id}-title"></h3><div id="${id}-description" class="text-secondary"></div>`
    const btn = start ? 'btn' : 'btn w-100'
    const cancel = withCancel ? `<div class="col${start ? '-auto' : ''}"><button type="button" class="${btn}" data-cancel></button></div>` : ''

    root.className = 'modal modal-blur fade'
    root.tabIndex = -1
    root.setAttribute('aria-labelledby', `${id}-title`)
    root.setAttribute('aria-describedby', `${id}-description`)
    root.innerHTML = `<div class="modal-dialog ${start ? '' : 'modal-sm '}modal-dialog-centered" style="transition-duration: 0.15s"><div class="modal-content"><div class="modal-body py-4 ${start ? 'd-flex gap-3' : 'text-center'}">${start ? `${media}<div>${text}</div>` : `${media ? `<div class="mb-3">${media}</div>` : ''}${text}`}</div><div class="modal-footer" style="--tblr-modal-footer-padding-y: 0.375rem"><div class="row gx-2 ${start ? 'ms-auto' : 'w-100'}">${cancel}<div class="col${start ? '-auto' : ''}"><button type="button" class="${btn} btn-${variant}" data-confirm></button></div></div></div></div></div>`

    const set = (selector: string, text: string) => {
      root.querySelector(selector)!.textContent = text
    }
    set('h3', title)
    set(`#${id}-description`, message)
    set('[data-confirm]', confirmText)
    if (withCancel) {
      set('[data-cancel]', cancelText)
    }

    document.body.append(root)

    const modal = new Modal(root, { backdrop: 'static', keyboard: true })
    let result = false

    root.addEventListener('click', (event) => {
      const button = (event.target as Element).closest<HTMLElement>('[data-confirm], [data-cancel]')
      if (button) {
        result = 'confirm' in button.dataset
        modal.hide()
      }
    })
    root.addEventListener('shown.bs.modal', () => {
      root.setAttribute('role', 'alertdialog')
      root.querySelector<HTMLElement>(focus === 'cancel' ? '[data-cancel]' : '[data-confirm]')?.focus()
    })
    root.addEventListener('hidden.bs.modal', () => {
      modal.dispose()
      root.remove()
      resolve(result)
    })

    modal.show()
  })

// js-docs-start alert-dialog-init
const AlertDialog = {
  confirm: (options: string | AlertDialogOptions): Promise<boolean> => open(options, true),
  alert: async (options: string | AlertDialogOptions): Promise<void> => {
    await open(options, false)
  },
}
// js-docs-end alert-dialog-init

export default AlertDialog
