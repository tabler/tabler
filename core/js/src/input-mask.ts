// Input mask plugin

const maskElementList: HTMLElement[] = [].slice.call(document.querySelectorAll<HTMLElement>('[data-mask]'))
maskElementList.map(function (maskEl: HTMLElement) {
  if (window.IMask && maskEl.dataset.mask) {
    new window.IMask(maskEl, {
      mask: maskEl.dataset.mask,
      lazy: maskEl.dataset['mask-visible'] === 'true',
    })
  }
})
