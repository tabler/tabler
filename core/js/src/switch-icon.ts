/*
Switch icons
 */
// js-docs-start switch-icon-init
const switchesTriggerList: HTMLElement[] = [].slice.call(document.querySelectorAll<HTMLElement>('[data-bs-toggle="switch-icon"]'))
switchesTriggerList.map(function (switchTriggerEl: HTMLElement) {
  switchTriggerEl.addEventListener('click', (e: MouseEvent) => {
    e.stopPropagation()

    switchTriggerEl.classList.toggle('active')
  })
})
// js-docs-end switch-icon-init
