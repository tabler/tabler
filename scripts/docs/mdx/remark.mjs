import remarkGfm from 'remark-gfm'
import { addImport } from './utils.mjs'

const remarkExamples = () => {

  return (tree) => {
    let preTree = { children: [] }

    tree.children = tree.children.map((node, index) => {
      if (node.type === 'jsx') {

        let [, props = '', html] = node.value.trim().match(/^<example(?:>|\s(.*?)>)(.*?)<\/example>$/is) ?? []

        if (html) {
          let next = tree.children[index + 1]

          node.value = `<Example ${props} containerClassName="${
              next?.type === 'code' ? 'mt-4 -mb-3' : 'my-6'
          }" html={${JSON.stringify(html)}} />`
        }
      }

      return node
    })

    tree.children = [...preTree.children, ...tree.children]
  }
}

export const remarkPlugins = [
  remarkGfm,
  remarkExamples
]
