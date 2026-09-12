// MDX parses the children of a multi-line JSX element as markdown flow, so a
// line of raw text inside literal demo markup (a `<button>` label, card body
// copy) comes back wrapped in a stray `paragraph` node — rendered as a `<p>`
// that never existed in the example source. Unwrap those paragraphs whenever
// the parent is a literal lowercase HTML element; real prose paragraphs (in
// page flow or under components like <Example>) are left alone, and literal
// `<p>` tags in examples are JSX elements, not markdown paragraphs.
export function unwrapJsxParagraphs() {
  return {
    name: 'unwrap-jsx-paragraphs',
    paragraph(node, ctx) {
      const parent = ctx.parent(node)
      if (parent?.type !== 'mdxJsxFlowElement' || !parent.name || !/^[a-z]/.test(parent.name)) return
      ctx.insertBefore(node, [...node.children])
      ctx.removeNode(node)
    },
  }
}
