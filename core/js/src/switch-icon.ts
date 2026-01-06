/*
Switch icons
 */
const switchesTriggerList: HTMLElement[] = [].slice.call(document.querySelectorAll<HTMLElement>('[data-bs-toggle="switch-icon"]'))
switchesTriggerList.map(function (switchTriggerEl: HTMLElement) {
  switchTriggerEl.addEventListener('click', (e: MouseEvent) => {
    e.stopPropagation()

    switchTriggerEl.classList.toggle('active')
  })
})
