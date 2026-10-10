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

    it('should register the extensions the library exports', () => {
      fixtureEl.innerHTML = '<input type="text" data-bs-toggle="datepicker" data-bs-display-months-count="2">'

      const instance = new Datepicker(input())

      const calendar = instance.calendar as VanillaCalendarPro.Calendar
      expect(calendar.extensions).toContain(VanillaCalendarPro.months)
      expect(calendar.extensions).toContain(VanillaCalendarPro.time)
      expect(calendar.type).toBe('multiple')
      expect(calendar.displayMonthsCount).toBe(2)
    })

    it('should keep the extensions passed in vcpOptions once', () => {
      fixtureEl.innerHTML = '<input type="text" data-bs-toggle="datepicker">'

      const instance = new Datepicker(input(), { vcpOptions: { extensions: [VanillaCalendarPro.months] } })

      const extensions = (instance.calendar as VanillaCalendarPro.Calendar).extensions
      expect(extensions.filter((extension) => extension === VanillaCalendarPro.months)).toHaveLength(1)
      expect(extensions).toContain(VanillaCalendarPro.motion)
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

    it('should turn week numbers on from a data attribute', () => {
      fixtureEl.innerHTML = '<input type="text" data-bs-toggle="datepicker" data-bs-week-numbers="true">'

      const instance = new Datepicker(input())

      expect(Datepicker.Default.weekNumbers).toBe(false)
      expect(instance._config.weekNumbers).toBe(true)
      expect(instance._buildCalendarOptions().enableWeekNumbers).toBe(true)
    })

    it('should keep week numbers enabled through vcpOptions', () => {
      fixtureEl.innerHTML = '<input type="text" data-bs-toggle="datepicker">'

      const instance = new Datepicker(input(), { vcpOptions: { enableWeekNumbers: true } })

      expect(instance._buildCalendarOptions().enableWeekNumbers).toBe(true)
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

    it('should show again after the plugin throws while showing', async () => {
      fixtureEl.innerHTML = '<input type="text" data-bs-toggle="datepicker">'

      const instance = new Datepicker(input())
      const pluginShow = vi.spyOn(instance.calendar!, 'show').mockImplementationOnce(() => {
        throw new Error('plugin failed')
      })

      await expect(instance.show()).rejects.toThrow('plugin failed')
      expect(instance._isShowing).toBe(false)

      await instance.show()
      expect(pluginShow).toHaveBeenCalledTimes(2)
      expect(instance._isShown).toBe(true)
    })

    it('should hide again after the plugin throws while hiding', async () => {
      fixtureEl.innerHTML = '<input type="text" data-bs-toggle="datepicker">'

      const instance = new Datepicker(input())
      await instance.show()
      vi.spyOn(instance.calendar!, 'hide').mockImplementationOnce(() => {
        throw new Error('plugin failed')
      })

      await expect(instance.hide()).rejects.toThrow('plugin failed')
      expect(instance._isHiding).toBe(false)

      await instance.hide()
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

      instance._calendar!.context.selectedDates = []
      instance._handleDateClick(instance._calendar!, new MouseEvent('click'))

      expect(input().value).toBe('')
    })

    it('does not run the hide timer after dispose', async () => {
      fixtureEl.innerHTML = '<input type="text">'
      const instance = new Datepicker(input())
      instance._calendar!.context.selectedDates = ['2024-06-20']
      instance._handleDateClick(instance._calendar!, new MouseEvent('click'))

      instance.dispose()
      await new Promise((resolve) => setTimeout(resolve, 150))
    })
  })

  describe('resize and initial value', () => {
    const groupMarkup = '<div class="input-group" style="display: flex; margin-left: 40px"><span style="width: 120px"></span><input type="text"></div>'

    it('keeps the popup aligned with the wrapper after a resize', async () => {
      fixtureEl.innerHTML = groupMarkup
      const wrapper = fixtureEl.querySelector<HTMLElement>('.input-group')!
      const instance = new Datepicker(input())
      await instance.show()

      window.dispatchEvent(new Event('resize'))

      const expected = wrapper.getBoundingClientRect().left + window.scrollX
      expect(instance.calendar!.context.mainElement.style.left).toBe(`${expected}px`)
    })

    it('stops aligning on resize once hidden or disposed', async () => {
      fixtureEl.innerHTML = groupMarkup
      const instance = new Datepicker(input())
      const spy = vi.spyOn(instance, '_alignToPositionElement')
      await instance.show()
      await instance.hide()
      spy.mockClear()

      window.dispatchEvent(new Event('resize'))
      expect(spy).not.toHaveBeenCalled()

      await instance.show()
      instance.dispose()
      spy.mockClear()
      window.dispatchEvent(new Event('resize'))
      expect(spy).not.toHaveBeenCalled()
    })

    it('formats an initial value like a picked date', () => {
      fixtureEl.innerHTML = '<input type="text" value="2024-06-20">'
      const dateFormat = { year: 'numeric', month: 'long', day: 'numeric' } as const

      new Datepicker(input(), { dateFormat, locale: 'en-US' })

      expect(input().value).toBe('June 20, 2024')
    })

    it('writes the value, not selectedDates, when both are set', () => {
      fixtureEl.innerHTML = '<input type="text" value="2024-06-20">'

      const instance = new Datepicker(input(), { selectedDates: ['2025-01-01'], locale: 'en-US' })

      expect(instance.getSelectedDates()).toEqual(['2024-06-20'])
      expect(input().value).toBe(new Date(2024, 5, 20).toLocaleDateString('en-US'))
    })

    it('keeps a formatted value selected when the input is initialised again', () => {
      fixtureEl.innerHTML = '<input type="text" value="2024-06-20">'
      new Datepicker(input(), { locale: 'pl-PL' }).dispose()

      const instance = new Datepicker(input(), { locale: 'pl-PL' })

      expect(input().value).toBe('20.06.2024')
      expect(instance.getSelectedDates()).toEqual(['2024-06-20'])
    })

    it('keeps a picked range selected when the input is initialised again', () => {
      fixtureEl.innerHTML = '<input type="text">'
      const config = { locale: 'pl-PL', selectionMode: 'multiple-ranged' } as const
      const first = new Datepicker(input(), config)
      first.setSelectedDates(['2024-06-10', '2024-06-18'])
      first.dispose()

      const instance = new Datepicker(input(), config)

      expect(instance.getSelectedDates()).toEqual(['2024-06-10', '2024-06-18'])
    })

    it('leaves an unparsable value as it is', () => {
      fixtureEl.innerHTML = '<input type="text" value="not a date">'

      new Datepicker(input())

      expect(input().value).toBe('not a date')
    })
  })

  describe('format pattern and bound input', () => {
    it('writes an ISO value with the iso keyword whatever the locale', () => {
      fixtureEl.innerHTML = '<input type="text" data-bs-locale="pl-PL" data-bs-date-format="iso" value="2026-09-30">'

      const instance = new Datepicker(input())

      expect(instance._config.dateFormat).toBe('iso')
      expect(input().value).toBe('2026-09-30')
      expect(instance._config.locale).toBe('pl-PL')
    })

    it('writes a token pattern from a data attribute', () => {
      fixtureEl.innerHTML = '<input type="text" data-bs-date-format="D/M/YYYY">'

      const instance = new Datepicker(input())
      instance.setSelectedDates(['2026-03-04'])

      expect(input().value).toBe('4/3/2026')
    })

    it('joins a range written with a pattern', () => {
      fixtureEl.innerHTML = '<input type="text">'

      const instance = new Datepicker(input(), { dateFormat: 'DD.MM.YYYY', selectionMode: 'multiple-ranged' })
      instance.setSelectedDates(['2026-06-10', '2026-06-18'])

      expect(input().value).toBe('10.06.2026 – 18.06.2026')
    })

    it('reads a value written with the pattern back', () => {
      fixtureEl.innerHTML = '<input type="text" value="30.09.2026">'

      const instance = new Datepicker(input(), { dateFormat: 'DD.MM.YYYY' })

      expect(instance.getSelectedDates()).toEqual(['2026-09-30'])
      expect(input().value).toBe('30.09.2026')
    })

    it('reads a range written with the pattern back', () => {
      fixtureEl.innerHTML = '<input type="text" value="10.06.2026 – 18.06.2026">'

      const instance = new Datepicker(input(), { dateFormat: 'DD.MM.YYYY', selectionMode: 'multiple-ranged' })

      expect(instance.getSelectedDates()).toEqual(['2026-06-10', '2026-06-18'])
    })

    it('does not read a day that does not exist', () => {
      fixtureEl.innerHTML = '<input type="text" value="31.02.2026">'

      const instance = new Datepicker(input(), { dateFormat: 'DD.MM.YYYY' })

      expect(instance.getSelectedDates()).toEqual([])
      expect(input().value).toBe('31.02.2026')
    })

    it('still reads an ISO value with another pattern', () => {
      fixtureEl.innerHTML = '<input type="text" value="2026-09-30">'

      const instance = new Datepicker(input(), { dateFormat: 'DD.MM.YYYY' })

      expect(instance.getSelectedDates()).toEqual(['2026-09-30'])
      expect(input().value).toBe('30.09.2026')
    })

    it('writes ISO dates into a bound input next to a popup field', () => {
      fixtureEl.innerHTML = '<input type="text" data-bs-locale="pl-PL" data-bs-bound-input="#due"><input type="hidden" id="due" name="due">'
      const hidden = fixtureEl.querySelector<HTMLInputElement>('#due')!

      const instance = new Datepicker(input())
      instance.setSelectedDates(['2026-09-30'])

      expect(input().value).toBe('30.09.2026')
      expect(hidden.value).toBe('2026-09-30')
    })

    it('selects the dates of a bound input the server filled in', () => {
      fixtureEl.innerHTML = '<input type="text" data-bs-locale="pl-PL" data-bs-bound-input="#due"><input type="hidden" id="due" name="due" value="2026-09-30">'

      const instance = new Datepicker(input())

      expect(instance.getSelectedDates()).toEqual(['2026-09-30'])
      expect(input().value).toBe('30.09.2026')
    })

    it('leaves a bound input outside the element in place on dispose', () => {
      fixtureEl.innerHTML = '<button type="button" data-bs-bound-input="#due">Pick</button><input type="hidden" id="due" name="due">'
      const hidden = fixtureEl.querySelector<HTMLInputElement>('#due')!

      new Datepicker(fixtureEl.querySelector('button')!).dispose()

      expect(hidden.parentElement).toBe(fixtureEl)
      expect(fixtureEl.querySelector('button')!.contains(hidden)).toBe(false)
    })
  })
})
