// Options for the `data-countup` attribute, derived from a formatted value.

export interface CountupOptions {
  prefix?: string
  suffix?: string
  decimalPlaces?: number
  /** `time` for an h:mm value, counted in minutes */
  format?: 'time'
}

/**
 * Splits a formatted stat like "$2,847", "42.7 hrs", "18.4%" or "3:28 hrs"
 * into the countup options that reproduce it: the text before the number
 * becomes the prefix, the text after it the suffix, the decimals are counted
 * and an h:mm value gets the `time` format. Returns null when the value holds
 * no number, so the caller can skip the countup.
 */
export function countupOptions(value: string): CountupOptions | null {
  const time = /^([^\d-]*)(\d+:\d{2})(.*)$/.exec(value.trim())
  if (time) {
    const options: CountupOptions = { format: 'time' }
    if (time[1]) {
      options.prefix = time[1]
    }

    if (time[3]) {
      options.suffix = time[3]
    }

    return options
  }

  const match = /^([^\d-]*)(-?\d[\d,]*(?:\.\d+)?)(.*)$/.exec(value.trim())
  if (!match) {
    return null
  }

  const prefix = match[1] ?? ''
  const number = match[2] ?? ''
  const suffix = match[3] ?? ''
  const decimals = number.split('.')[1]?.length ?? 0
  const options: CountupOptions = {}
  if (prefix) {
    options.prefix = prefix
  }

  if (suffix) {
    options.suffix = suffix
  }

  if (decimals > 0) {
    options.decimalPlaces = decimals
  }

  return options
}
