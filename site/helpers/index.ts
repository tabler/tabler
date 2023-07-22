export const groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    ;(rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})
}

export const sortByKeys = function (xs) {
  return Object.keys(xs)
    .sort()
    .reduce((obj, key) => {
      obj[key] = xs[key]
      return obj
    }, {})
}

export const toPascalCase = function (text: string) {
  return text
    .replace(new RegExp(/[-_]+/, "g"), " ")
    .replace(new RegExp(/[^\w\s]/, "g"), "")
    .replace(
      new RegExp(/\s+(.)(\w+)/, "g"),
      ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
    )
    .replace(new RegExp(/\s/, "g"), "")
    .replace(new RegExp(/\w/), (s) => s.toUpperCase())
}

export const baseUrl = {
  development: "http://localhost:3000",
  production: "https://tabler-icons.io",
}[process.env.NODE_ENV]

export const getCurrentBrand = (hostname: string) => {
  if (hostname && hostname.match(/tabler-icons/)) {
    return "tabler-icons"
  }

  return "tabler-ui"
}
