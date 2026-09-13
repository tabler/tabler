// js-docs-start switch-icon-init
const switchesTriggerList: HTMLElement[] = [].slice.call(document.querySelectorAll<HTMLElement>('[data-bs-toggle="switch-icon"]'))
switchesTriggerList.map(function (switchTriggerEl: HTMLElement) {
  switchTriggerEl.addEventListener('click', (e: MouseEvent) => {
    e.stopPropagation()

    // The trigger is the .switch-icon itself, or a button (e.g. .btn-action) wrapping one
    const iconEl = switchTriggerEl.matches('.switch-icon') ? switchTriggerEl : (switchTriggerEl.querySelector<HTMLElement>('.switch-icon') ?? switchTriggerEl)

    // `.disabled` only blocks the pointer; Enter and Space still fire a click
    if (iconEl.classList.contains('switch-icon-loading') || switchTriggerEl.classList.contains('disabled') || switchTriggerEl.getAttribute('aria-disabled') === 'true') {
      return
    }

    const active = !iconEl.classList.contains('active')
    const setActive = (value: boolean) => {
      iconEl.classList.toggle('active', value)
      switchTriggerEl.setAttribute('aria-pressed', value ? 'true' : 'false')
    }

    // A listener can cancel the toggle with preventDefault(), or hand over a
    // promise with wait(): the button shows a spinner until it settles and
    // switches only when it resolves.
    let pending: Promise<unknown> | undefined
    const event = new CustomEvent('tabler:switch-icon-toggle', {
      bubbles: true,
      cancelable: true,
      detail: { active, wait: (promise: Promise<unknown>) => (pending = promise) },
    })

    if (!switchTriggerEl.dispatchEvent(event)) {
      return
    }

    if (!pending) {
      setActive(active)
      return
    }

    iconEl.classList.add('switch-icon-loading')
    switchTriggerEl.setAttribute('aria-busy', 'true')
    pending
      .then(
        () => setActive(active),
        () => undefined,
      )
      .finally(() => {
        iconEl.classList.remove('switch-icon-loading')
        switchTriggerEl.removeAttribute('aria-busy')
      })
  })
})
// js-docs-end switch-icon-init
