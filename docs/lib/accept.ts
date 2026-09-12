// Accept negotiation between text/html and text/markdown (RFC 9110 q-values).
// A tie goes to markdown only when the client named text/markdown explicitly,
// so `Accept: */*` from a browser still gets html; 'none' means answer 406.

type MediaRange = {
  type: string
  subtype: string
  q: number
}

export type Format = 'html' | 'markdown' | 'none'

function parseAccept(header: string): MediaRange[] {
  return header
    .split(',')
    .map((part): MediaRange => {
      const [range = '', ...params] = part.trim().split(';')
      const [type = '', subtype = ''] = range.trim().toLowerCase().split('/')
      let q = 1
      for (const param of params) {
        const [key, value] = param.split('=')
        if (key?.trim().toLowerCase() === 'q') {
          const parsed = Number.parseFloat(value ?? '')
          // a present but unparsable q fails closed
          q = Number.isNaN(parsed) ? 0 : Math.min(Math.max(parsed, 0), 1)
        }
      }
      return { type, subtype, q }
    })
    .filter((range) => range.type !== '' && range.subtype !== '')
}

// The q of the most specific matching range: exact type beats `text/*` beats `*/*`.
function match(ranges: MediaRange[], type: string, subtype: string) {
  let q = 0
  let specificity = -1
  let explicit = false
  for (const range of ranges) {
    let rangeSpecificity: number
    if (range.type === type && range.subtype === subtype) rangeSpecificity = 2
    else if (range.type === type && range.subtype === '*') rangeSpecificity = 1
    else if (range.type === '*' && range.subtype === '*') rangeSpecificity = 0
    else continue
    if (rangeSpecificity > specificity) {
      specificity = rangeSpecificity
      q = range.q
      explicit = rangeSpecificity === 2
    }
  }
  return { q, explicit }
}

export function preferredFormat(header: string | null): Format {
  if (!header || header.trim() === '') return 'html'
  const ranges = parseAccept(header)
  if (ranges.length === 0) return 'html'

  const html = match(ranges, 'text', 'html')
  const markdown = match(ranges, 'text', 'markdown')

  if (markdown.q > html.q) return 'markdown'
  if (markdown.q === html.q && markdown.q > 0 && markdown.explicit) return 'markdown'
  if (html.q > 0) return 'html'
  if (markdown.q > 0) return 'markdown'
  return 'none'
}
