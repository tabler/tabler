// clean-css 5 does not understand a bare cascade-layer order statement
// (`@layer a, b, c;`). It drops the statement and, worse, reports
// "Invalid character(s) … Ignoring" and skips the whole rule that follows it —
// in tabler.css that is the `:root` block with every token. Without the
// statement the layers would also be ordered by first appearance instead of
// by the declared list. So the statements come out before minifying and go
// back in at the top of the minified file, after `@charset` and the banner.

const layerOrderStatement = /^@layer\s+[^{};]+;[ \t]*\r?\n?/gm

export function extractLayerOrder(css: string): { css: string; statements: string[] } {
  const statements = (css.match(layerOrderStatement) ?? []).map((s) => s.trim())
  return { css: css.replace(layerOrderStatement, ''), statements }
}

// Inserts after the leading `@charset` and `/*! … */` comment, so the
// statement still precedes every rule but the banner stays first.
export function prependLayerOrder(css: string, statements: string[]): string {
  if (statements.length === 0) return css
  const head = css.match(/^(@charset\s+"[^"]*";\s*)?(\/\*![\s\S]*?\*\/\s*)?/)
  const at = head ? head[0].length : 0
  return `${css.slice(0, at)}${statements.join('')}${css.slice(at)}`
}
