// Options for the `data-countup` attribute, derived from a formatted value.

export interface CountupOptions {
  prefix?: string
  suffix?: string
  decimalPlaces?: number
}

/**
 * Splits a formatted stat like "$2,847", "42.7 hrs" or "18.4%" into the
 * countup options that reproduce it: the text before the number becomes the
 * prefix, the text after it the suffix, and the decimals are counted. Returns
 * null when the value holds no number, so the caller can skip the countup.
 */
export function countupOptions(value: string): CountupOptions | null {
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
