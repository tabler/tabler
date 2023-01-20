import remarkGfm from 'remark-gfm'
import { addDefaultImport } from './utils.mjs'

const remarkExamples = () => {

  return (tree) => {
    let preTree = { children: [] }
    let componentName

    tree.children = tree.children.map((node, index) => {
      if (node.type === 'jsx') {

        let [, props = '', html] = node.value.trim().match(/^<example(?:>|\s(.*?)>)(.*?)<\/example>$/is) ?? []

        if (html) {
          if (!componentName) {
            componentName = addDefaultImport(preTree, '@/components/Example', 'Example')
          }

          node.value = `<Example ${props} html={${JSON.stringify(html)}} />`
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
