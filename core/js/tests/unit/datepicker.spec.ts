import { describe, it, expect, beforeAll, beforeEach, afterEach, vi } from 'vitest'
import * as VanillaCalendarPro from 'vanilla-calendar-pro'
import { clearFixture, getFixture } from '../helpers/fixture'
import Datepicker from '../../src/datepicker'
import EventHandler from '../../src/bootstrap/dom/event-handler'

describe('Datepicker', () => {
  let fixtureEl: HTMLElement

  beforeAll(() => {
    fixtureEl = getFixture()
  })

  beforeEach(() => {
    // The page loads the plugin as a global; the tests hand it over the same way.
    window.VanillaCalendarPro = VanillaCalendarPro
  })

  afterEach(() => {
    clearFixture()
    delete window.VanillaCalendarPro

    // The plugin mounts popups on <body>, outside the fixture
    for (const calendarEl of document.querySelectorAll('[data-vc="calendar"]')) {
      calendarEl.remove()
    }
  })

  const input = (): HTMLInputElement => fixtureEl.querySelector('input')!
  const tick = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 20))

  describe('NAME', () => {
    it('should return plugin name', () => {
      expect(Datepicker.NAME).toBe('datepicker')
    })
  })

  describe('Default', () => {
    it('should match the Bootstrap 6 defaults', () => {
      expect(Datepicker.Default.dateMin).toBeNull()
      expect(Datepicker.Default.dateMax).toBeNull()
      expect(Datepicker.Default.selectionMode).toBe('single')
      expect(Datepicker.Default.firstWeekday).toBe(1)
      expect(Datepicker.Default.locale).toBe('default')
      expect(Datepicker.Default.placement).toBe('left')
      expect(Datepicker.Default.inline).toBe(false)
      expect(Datepicker.Default.displayMonthsCount).toBe(1)
    })
  })

  describe('constructor', () => {
    it('should create the calendar on an input', () => {
      fixtureEl.innerHTML = '<input type="text" data-bs-toggle="datepicker">'

      const instance = new Datepicker(input())

      expect(instance.calendar).not.toBeNull()
      expect(instance._isInput).toBe(true)
    })

    it('should stay inert without the plugin', () => {
      delete window.VanillaCalendarPro
      fixtureEl.innerHTML = '<input type="text" data-bs-toggle="datepicker">'

      const instance = new Datepicker(input())

      expect(instance.calendar).toBeNull()
    })

    it('should detect a button trigger and use it as the display element', () => {
      fixtureEl.innerHTML = '<button type="button" data-bs-toggle="datepicker">Select date</button>'

      const instance = new Datepicker(fixtureEl.querySelector('button')!)

      expect(instance._isInput).toBe(false)
      expect(instance._displayElement).toBe(fixtureEl.querySelector('button'))
    })

    it('should prefer a display child inside a button', () => {
      fixtureEl.innerHTML = '<button type="button" data-bs-toggle="datepicker"><span data-bs-datepicker-display>Select date</span></button>'

      const instance = new Datepicker(fixtureEl.querySelector('button')!)

      expect(instance._displayElement).toBe(fixtureEl.querySelector('span'))
    })

    it('should read config from data attributes', () => {
      fixtureEl.innerHTML = '<input type="text" data-bs-toggle="datepicker" data-bs-selection-mode="multiple-ranged" data-bs-first-weekday="0">'

      const instance = new Datepicker(input())

      expect(instance._config.selectionMode).toBe('multiple-ranged')
      expect(instance._config.firstWeekday).toBe(0)
    })

    it('should let a passed config win over data attributes', () => {
      fixtureEl.innerHTML = '<input type="text" data-bs-toggle="datepicker" data-bs-first-weekday="0">'

      const instance = new Datepicker(input(), { selectionMode: 'multiple' })

      expect(instance._config.selectionMode).toBe('multiple')
      expect(instance._config.firstWeekday).toBe(0)
    })

    it('should write preselected dates into the input', () => {
      fixtureEl.innerHTML = `<input type="text" data-bs-toggle="datepicker" data-bs-selection-mode="multiple-ranged" data-bs-selected-dates='["2026-06-10", "2026-06-18"]'>`

      const instance = new Datepicker(input())

      expect(instance._config.selectedDates).toEqual(['2026-06-10', '2026-06-18'])
      expect(instance.getSelectedDates()).toEqual(['2026-06-10', '2026-06-18'])
      expect(input().value).toContain(' – ')
    })

    it('should read a YYYY-MM-DD value as a local date', () => {
      fixtureEl.innerHTML = '<input type="text" data-bs-toggle="datepicker" value="2020-06-20">'

      const instance = new Datepicker(input())

      expect(instance.getSelectedDates()).toEqual(['2020-06-20'])
    })

    it('should position the popup against the .input-icon wrapper', () => {
      fixtureEl.innerHTML = '<div class="input-icon"><input type="text" data-bs-toggle="datepicker"><span class="input-icon-addon"></span></div>'

      const instance = new Datepicker(input())

      expect(instance._positionElement).toBe(fixtureEl.querySelector('.input-icon'))
    })

    it('should bind a hidden input inside an inline calendar', () => {
      fixtureEl.innerHTML = '<div data-bs-toggle="datepicker" data-bs-inline="true"><input type="hidden" name="date"></div>'

      const instance = new Datepicker(fixtureEl.querySelector('div')!, { selectedDates: ['2026-03-04'] })

      expect(instance._isInline).toBe(true)
      expect(input().isConnected).toBe(true)
      expect(input().value).toBe('2026-03-04')
    })
  })

  describe('show and hide', () => {
    it('should fire show and shown, then hide and hidden', async () => {
      fixtureEl.innerHTML = '<input type="text" data-bs-toggle="datepicker">'
      const seen: string[] = []
      for (const name of ['show', 'shown', 'hide', 'hidden']) {
        input().addEventListener(`${name}.bs.datepicker`, () => seen.push(name))
      }

      const instance = new Datepicker(input())
      await instance.show()
      expect(instance._isShown).toBe(true)

      await instance.hide()
      expect(instance._isShown).toBe(false)
      expect(seen).toEqual(['show', 'shown', 'hide', 'hidden'])
    })

    it('should stay closed when show is prevented', async () => {
      fixtureEl.innerHTML = '<input type="text" data-bs-toggle="datepicker">'
      input().addEventListener('show.bs.datepicker', (event) => event.preventDefault())

      const instance = new Datepicker(input())
      await instance.show()

      expect(instance._isShown).toBe(false)
    })

    it('should not show a disabled input', async () => {
      fixtureEl.innerHTML = '<input type="text" data-bs-toggle="datepicker" disabled>'

      const instance = new Datepicker(input())
      const spy = vi.spyOn(EventHandler, 'trigger')
      await instance.show()

      expect(spy).not.toHaveBeenCalled()
      spy.mockRestore()
    })

    it('should do nothing for an inline calendar', async () => {
      fixtureEl.innerHTML = '<div data-bs-toggle="datepicker" data-bs-inline="true"></div>'

      const instance = new Datepicker(fixtureEl.querySelector('div')!)
      await instance.toggle()

      expect(instance._isShown).toBe(false)
    })

    it('should hide when focus leaves the input and the calendar', async () => {
      fixtureEl.innerHTML = '<input type="text" data-bs-toggle="datepicker"><button type="button">Next</button>'

      const instance = new Datepicker(input())
      await instance.show()
      fixtureEl.querySelector('button')!.focus()

      expect(instance._isShown).toBe(false)
    })
  })

  describe('setSelectedDates', () => {
    it('should update the calendar selection', () => {
      fixtureEl.innerHTML = '<input type="text" data-bs-toggle="datepicker">'

      const instance = new Datepicker(input())
      instance.setSelectedDates(['2026-01-15'])

      expect(instance.getSelectedDates()).toEqual(['2026-01-15'])
    })
  })

  describe('dispose', () => {
    it('should destroy the calendar and drop the instance', () => {
      fixtureEl.innerHTML = '<input type="text" data-bs-toggle="datepicker">'

      const instance = new Datepicker(input())
      const destroy = vi.spyOn(instance.calendar!, 'destroy')
      instance.dispose()

      expect(destroy).toHaveBeenCalled()
      expect(Datepicker.getInstance(input())).toBeNull()
    })
  })

  describe('data-api', () => {
    it('should open on focus of a toggle input', async () => {
      fixtureEl.innerHTML = '<input type="text" data-bs-toggle="datepicker">'

      input().focus()
      await new Promise((resolve) => setTimeout(resolve, 0))

      const instance = Datepicker.getInstance(input()) as Datepicker | null
      expect(instance).not.toBeNull()
      expect(instance!._isShown).toBe(true)
    })

    it('should toggle on click of a button trigger', async () => {
      fixtureEl.innerHTML = '<button type="button" data-bs-toggle="datepicker">Select date</button>'

      const button = fixtureEl.querySelector('button')!
      button.click()
      await new Promise((resolve) => setTimeout(resolve, 0))

      const instance = Datepicker.getInstance(button) as Datepicker | null
      expect(instance).not.toBeNull()
      expect(instance!._isShown).toBe(true)
    })

    it('should close on the second click of a button trigger', async () => {
      fixtureEl.innerHTML = '<button type="button" data-bs-toggle="datepicker">Select date</button>'

      const button = fixtureEl.querySelector('button')!
      const seen: string[] = []
      for (const name of ['show', 'shown', 'hide', 'hidden']) {
        button.addEventListener(`${name}.bs.datepicker`, () => seen.push(name))
      }

      button.click()
      await tick()
      button.click()
      await tick()

      const instance = Datepicker.getInstance(button) as Datepicker
      expect(instance._isShown).toBe(false)
      expect(instance.calendar!.context.isShowInInputMode).toBe(false)
      expect(seen).toEqual(['show', 'shown', 'hide', 'hidden'])

      button.click()
      await tick()
      expect(instance._isShown).toBe(true)
    })
  })

  describe('closed by the plugin', () => {
    const pressEscape = (): void => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    }

    it('should fire hide and hidden on Escape', async () => {
      fixtureEl.innerHTML = '<input type="text" data-bs-toggle="datepicker">'
      const seen: string[] = []
      for (const name of ['hide', 'hidden']) {
        input().addEventListener(`${name}.bs.datepicker`, () => seen.push(name))
      }

      const instance = new Datepicker(input())
      await instance.show()
      pressEscape()

      expect(instance._isShown).toBe(false)
      expect(seen).toEqual(['hide', 'hidden'])
    })

    it('should stay open when hide is prevented', async () => {
      fixtureEl.innerHTML = '<input type="text" data-bs-toggle="datepicker">'
      const seen: string[] = []
      input().addEventListener('hide.bs.datepicker', (event) => event.preventDefault())
      for (const name of ['shown', 'hidden']) {
        input().addEventListener(`${name}.bs.datepicker`, () => seen.push(name))
      }

      const instance = new Datepicker(input())
      await instance.show()
      pressEscape()

      expect(instance._isShown).toBe(true)
      expect(instance.calendar!.context.isShowInInputMode).toBe(true)
      expect(seen).toEqual(['shown'])
    })
  })

  describe('audit fixes', () => {
    it('accepts a Date for dateMin and dateMax', () => {
      fixtureEl.innerHTML = '<input type="text">'
      expect(() => new Datepicker(input(), { dateMin: new Date(2024, 0, 1), dateMax: new Date(2024, 11, 31) })).not.toThrow()
    })

    it('keeps the live input in the DOM after dispose', () => {
      fixtureEl.innerHTML = '<input type="text" id="picker">'
      const original = input()
      const instance = new Datepicker(original)
      instance.setSelectedDates(['2024-06-20'])

      instance.dispose()

      expect(document.querySelector('#picker')).toBe(original)
      expect(original.value).not.toBe('')
    })

    it('keeps a single bound input for an inline calendar after dispose', () => {
      fixtureEl.innerHTML = '<div data-bs-toggle="datepicker" data-bs-inline="true"><input type="hidden" name="d"></div>'
      const instance = new Datepicker(fixtureEl.firstElementChild as HTMLElement)
      instance.setSelectedDates(['2024-06-20'])

      instance.dispose()

      const bound = fixtureEl.querySelectorAll('input[name="d"]')
      expect(bound.length).toBe(1)
      expect((bound[0] as HTMLInputElement).value).toBe('2024-06-20')
    })

    it('writes the field and opens on the month of setSelectedDates', () => {
      fixtureEl.innerHTML = '<input type="text">'
      const instance = new Datepicker(input())

      instance.setSelectedDates([new Date(1990, 5, 20)])

      expect(instance.getSelectedDates()).toEqual(['1990-06-20'])
      expect(input().value).not.toBe('')
      expect(instance.calendar!.context.selectedMonth).toBe(5)
      expect(instance.calendar!.context.selectedYear).toBe(1990)
    })

    it('opens on the month of an initial value', () => {
      fixtureEl.innerHTML = '<input type="text" value="1990-06-20">'
      const instance = new Datepicker(input())

      expect(instance.calendar!.context.selectedMonth).toBe(5)
      expect(instance.calendar!.context.selectedYear).toBe(1990)
    })

    it('clears the field when the picked date is deselected', () => {
      fixtureEl.innerHTML = '<input type="text">'
      const instance = new Datepicker(input())
      instance.setSelectedDates(['2024-06-20'])
      expect(input().value).not.toBe('')

      instance.calendar!.context.selectedDates = []
      instance._handleDateClick(instance.calendar!, new MouseEvent('click'))

      expect(input().value).toBe('')
    })

    it('does not run the hide timer after dispose', async () => {
      fixtureEl.innerHTML = '<input type="text">'
      const instance = new Datepicker(input())
      instance.calendar!.context.selectedDates = ['2024-06-20']
      instance._handleDateClick(instance.calendar!, new MouseEvent('click'))

      instance.dispose()
      await new Promise((resolve) => setTimeout(resolve, 150))
    })
  })
})
