// Input mask plugin

const maskElementList: HTMLElement[] = [].slice.call(document.querySelectorAll<HTMLElement>('[data-mask]'))
maskElementList.map(function (maskEl: HTMLElement) {
  window.IMask &&
    new window.IMask(maskEl, {
      mask: maskEl.dataset.mask,
      lazy: maskEl.dataset['mask-visible'] === 'true',
    })
})
