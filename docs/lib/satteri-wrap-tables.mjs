// A markdown table is only as wide as the prose column, so an options table
// with four columns either squeezes its description or, on a phone, pushes the
// whole page sideways. Every docs system (Starlight, VitePress, GitHub) puts
// the table in a scrolling box instead; this does the same with a wrapper
// element, which keeps the `<table>` semantics that `display: block` on the
// table itself would throw away. Only markdown tables are elements here —
// literal `<table>` markup inside an <Example> is JSX and is left alone.
export function wrapTables() {
  return {
    name: 'wrap-tables',
    element: {
      filter: ['table'],
      visit(node, ctx) {
        ctx.wrapNode(node, {
          type: 'element',
          tagName: 'div',
          properties: { className: ['docs-table'] },
          children: [],
        })
      },
    },
  }
}
