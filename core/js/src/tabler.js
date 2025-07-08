export const prefix = 'tblr-'

export const hexToRgba = (hex, opacity) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

  return result ? `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${opacity})` : null
}

export const getColor = (color, opacity = 1) => {
  const c = getComputedStyle(document.body).getPropertyValue(`--${prefix}${color}`).trim()

  if (opacity !== 1) {
	 return hexToRgba(c, opacity)
  }

  return c
}