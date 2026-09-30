import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest'
import { clearFixture, getFixture } from '../helpers/fixture'
import PhoneInput from '../../src/phone-input'

describe('PhoneInput', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  afterEach(() => {
    clearFixture()
  })

  const setup = (attributes = '', config: Record<string, unknown> = {}): { input: HTMLInputElement; phone: PhoneInput } => {
    fixtureEl.innerHTML = `<label for="phone">Phone</label><input type="tel" id="phone" class="form-control" ${attributes} />`
    const input = fixtureEl.querySelector<HTMLInputElement>('#phone')!
    return { input, phone: new PhoneInput(input, config) }
  }

  const type = (input: HTMLInputElement, value: string): void => {
    input.value = value
    input.dispatchEvent(new Event('input', { bubbles: true }))
  }

  const toggle = (): HTMLElement => fixtureEl.querySelector<HTMLElement>('.combobox-toggle')!

  describe('constructor', () => {
    it('should put a country picker in front of the input', () => {
      const { input } = setup('data-bs-country="pl"')

      expect(input.parentElement!.classList.contains('phone-input-group')).toBe(true)
      expect(input.previousElementSibling!.classList.contains('dropdown-menu')).toBe(true)
      expect(toggle().nextElementSibling!.classList.contains('phone-input-menu')).toBe(true)
      expect(toggle().textContent).toContain('+48')
      expect(toggle().querySelector('.flag-country-pl')).not.toBeNull()
      expect(toggle().getAttribute('aria-label')).toBe('Country')
    })

    it('should fall back to the first country when the given one is unknown', () => {
      const { phone } = setup('data-bs-country="zz"')
      expect(phone.getCountry()).not.toBe('zz')
    })

    it('should list preferred countries first and only the allowed ones', () => {
      const { phone } = setup('', { preferredCountries: ['pl', 'de'], onlyCountries: ['pl', 'de', 'fr', 'us'], country: 'pl' })
      const values = [...fixtureEl.querySelectorAll<HTMLElement>('.dropdown-item')].map((item) => item.dataset.bsValue)

      expect(values).toEqual(['pl', 'de', 'fr', 'us'])
      expect(phone.getCountry()).toBe('pl')
    })

    it('should read the country lists from a comma separated string', () => {
      const { phone } = setup('data-bs-only-countries="pl, de,fr" data-bs-preferred-countries="fr" data-bs-country="fr"')
      const values = [...fixtureEl.querySelectorAll<HTMLElement>('.dropdown-item')].map((item) => item.dataset.bsValue)

      expect(values).toEqual(['fr', 'de', 'pl'])
      expect(phone.getCountry()).toBe('fr')
    })

    it('should copy the input size to the picker', () => {
      fixtureEl.innerHTML = '<input type="tel" class="form-control form-control-sm" />'
      new PhoneInput(fixtureEl.querySelector('input')!)
      expect(toggle().classList.contains('form-select-sm')).toBe(true)
    })

    it('should disable the picker with the input', () => {
      setup('disabled')
      expect(toggle().hasAttribute('disabled')).toBe(true)
    })
  })

  describe('numbers', () => {
    it('should build the international number from the national digits', () => {
      const { input, phone } = setup('data-bs-country="pl"')

      type(input, '600 100 200')
      expect(phone.getNumber()).toBe('+48600100200')
    })

    it('should drop leading zeros of the national number', () => {
      const { input, phone } = setup('data-bs-country="gb"')

      type(input, '07911 123456')
      expect(phone.getNumber()).toBe('+447911123456')
    })

    it('should return an empty string for an empty input', () => {
      expect(setup().phone.getNumber()).toBe('')
    })

    it('should remove characters that cannot be in a number', () => {
      const { input } = setup('data-bs-format="false"')

      type(input, 'ab12c-3')
      expect(input.value).toBe('12-3')
    })

    it('should validate the length', () => {
      const { input, phone } = setup('data-bs-country="pl"')

      type(input, '12')
      expect(phone.isValid()).toBe(false)

      type(input, '600100200')
      expect(phone.isValid()).toBe(true)

      type(input, '1234567890123456')
      expect(phone.isValid()).toBe(false)
    })
  })

  describe('formatting', () => {
    it('should write the number the way it is written in the country', () => {
      const { input, phone } = setup('data-bs-country="pl"')

      type(input, '600100200')
      expect(input.value).toBe('600 100 200')

      phone.setCountry('us')
      expect(input.value).toBe('(600) 100-200')

      type(input, '2025550100')
      expect(input.value).toBe('(202) 555-0100')
      expect(phone.getNumber()).toBe('+12025550100')
    })

    it('should show a separator only when a digit follows it', () => {
      const { input } = setup('data-bs-country="us"')

      type(input, '20')
      expect(input.value).toBe('(20')

      type(input, '2025')
      expect(input.value).toBe('(202) 5')
    })

    it('should group the digits that do not fit the pattern', () => {
      const { input } = setup('data-bs-country="pl"')

      type(input, '60010020012345')
      expect(input.value).toBe('600 100 200 123 45')
    })

    it('should use a generic pattern for a country without one', () => {
      const { input } = setup('data-bs-country="is"')

      type(input, '5551234')
      expect(input.value).toBe('555 123 4')
    })

    it('should keep the cursor next to the same digit', () => {
      const { input } = setup('data-bs-country="pl"')

      input.focus()
      type(input, '600 100 200')
      input.value = '600 1900 200'
      input.setSelectionRange(6, 6)
      input.dispatchEvent(new Event('input', { bubbles: true }))

      expect(input.value).toBe('600 190 020 0')
      expect(input.selectionStart).toBe(6)
    })

    it('should put the leading zero back for a number in the international form', () => {
      const { input, phone } = setup('data-bs-country="us"')

      type(input, '+44 7911 123456')
      expect(phone.getCountry()).toBe('gb')
      expect(input.value).toBe('07911 123456')
      expect(phone.getNumber()).toBe('+447911123456')

      type(input, '+33 6 11 22 33 44')
      expect(input.value).toBe('06 11 22 33 44')
      expect(phone.getNumber()).toBe('+33611223344')
    })

    it('should not format when format is off', () => {
      const { input } = setup('data-bs-country="pl" data-bs-format="false"')

      type(input, '600100200')
      expect(input.value).toBe('600100200')
    })
  })

  describe('country detection', () => {
    it('should switch the country when a number with a dial code is typed', () => {
      const { input, phone } = setup('data-bs-country="us"')
      const change = vi.fn()
      input.addEventListener('countrychange.bs.phoneInput', change)

      type(input, '+48 600 100 200')

      expect(phone.getCountry()).toBe('pl')
      expect(input.value).toBe('600 100 200')
      expect(toggle().textContent).toContain('+48')
      expect(change).toHaveBeenCalledOnce()
      expect(phone.getNumber()).toBe('+48600100200')
    })

    it('should pick the main country of a shared dial code', () => {
      const { input, phone } = setup('data-bs-country="pl"')

      type(input, '+1 202 555 0100')
      expect(phone.getCountry()).toBe('us')

      type(input, '+44 7911 123456')
      expect(phone.getCountry()).toBe('gb')
    })

    it('should keep the current country when it shares the dial code', () => {
      const { input, phone } = setup('data-bs-country="ca"')

      type(input, '+1 613 555 0100')
      expect(phone.getCountry()).toBe('ca')
    })

    it('should not detect the country when autoDetect is off', () => {
      const { input, phone } = setup('data-bs-country="pl" data-bs-auto-detect="false"')

      type(input, '+1 202')
      expect(phone.getCountry()).toBe('pl')
    })

    it('should wait for a complete dial code', () => {
      const { input, phone } = setup('data-bs-country="us"')

      type(input, '+3')
      expect(phone.getCountry()).toBe('us')
      expect(input.value).toBe('+3')
    })
  })

  describe('country picker', () => {
    it('should follow a choice made in the menu and focus the input', async () => {
      const { input, phone } = setup('data-bs-country="us"')
      const change = vi.fn()
      input.addEventListener('countrychange.bs.phoneInput', change)

      toggle().click()
      fixtureEl.querySelector<HTMLElement>('.dropdown-item[data-bs-value="de"]')!.click()

      expect(phone.getCountry()).toBe('de')
      expect(phone.getDialCode()).toBe('49')
      expect(toggle().textContent).toContain('+49')
      expect(change).toHaveBeenCalledOnce()
      await Promise.resolve()
      expect(document.activeElement).toBe(input)
    })

    it('should set the country from code', () => {
      const { phone } = setup()

      phone.setCountry('FR')
      expect(phone.getCountry()).toBe('fr')
      expect(toggle().textContent).toContain('+33')

      phone.setCountry('nope')
      expect(phone.getCountry()).toBe('fr')
    })

    it('should set the whole number', () => {
      const { input, phone } = setup()

      phone.setNumber('+49 30 1234567')
      expect(phone.getCountry()).toBe('de')
      expect(input.value).toBe('030 1234567')
      expect(phone.getNumber()).toBe('+49301234567')
    })
  })

  describe('hidden input', () => {
    it('should keep the full number in a hidden input', () => {
      const { input } = setup('data-bs-country="pl" data-bs-hidden-input="phone_full"')
      const hidden = fixtureEl.querySelector<HTMLInputElement>('input[name="phone_full"]')!

      type(input, '600 100 200')
      expect(hidden.type).toBe('hidden')
      expect(hidden.value).toBe('+48600100200')
    })
  })

  describe('dispose', () => {
    it('should put the input back where it was', () => {
      const { input, phone } = setup()
      phone.dispose()

      expect(input.parentElement).toBe(fixtureEl)
      expect(fixtureEl.querySelector('.phone-input')).toBeNull()
      expect(fixtureEl.querySelector('.combobox-toggle')).toBeNull()
      expect(PhoneInput.getInstance(input)).toBeNull()
    })
  })
})
