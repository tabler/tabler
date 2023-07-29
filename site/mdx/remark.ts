import { mdxAnnotations } from 'mdx-annotations'
import remarkGfm from 'remark-gfm'
import remarkMdx from 'remark-mdx'
import remarkFrontmatter from 'remark-frontmatter'
import remarkParseFrontmatter from 'remark-parse-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkSmartypants from 'remark-smartypants'
import remarkUnwrapImages from 'remark-unwrap-images'
import remarkMdxCodeMeta from 'remark-mdx-code-meta';
import remarkToc from 'remark-toc'

import remarkGithub from 'remark-github'
import remarkMath from 'remark-math'

// import { toMarkdown } from 'mdast-util-to-markdown'
// import { frontmatterToMarkdown } from 'mdast-util-frontmatter'
// import { mdxjsEsmToMarkdown } from 'mdast-util-mdxjs-esm'
// import { mdxJsxToMarkdown } from 'mdast-util-mdx-jsx'
// import { gfmTableToMarkdown } from 'mdast-util-gfm-table'
// import * as acorn from 'acorn'
// import jsx from 'acorn-jsx'


// const remarkLayout = () => {
//   const parser = acorn.Parser.extend(jsx())
//   let layout = 'BasicLayout'

//   return (tree, file) => {
//     if(file.history[0].match(/pages\/docs\//)) {
//       layout = 'DocsLayout'
//     } else if(file.history[0].match(/pages\/guides\//)) {
//       layout = 'GuideLayout'
//     } else if(file.history[0].match(/pages\/changelog\//)) {
//       layout = 'ChangelogLayout'
//     }

//     console.log(file.history[0], layout);

//     let exportPropsStr = `export async function getStaticProps() { return { props: { meta }}}`
//     tree.children.push({
//       type: 'mdxjsEsm',
//       value: exportPropsStr,
//       data: {
//         estree: parser.parse(exportPropsStr, {
//           sourceType: 'module',
//           ecmaVersion: 'latest',
//           plugins: {
//             'jsx': true
//           }
//         })
//       }
//     })

//     for (let node of tree.children) {
//       if (node.type === 'mdxjsEsm' && new RegExp(`export\\s+default`).test(node.value)) {
//         console.log('Found default export')
//         return
//       }
//     }

//     if(layout) {
//       console.log('Adding layout')
//       let importStr = `import ${layout} from '@/layouts/${layout}.js'`
//       tree.children.push({
//         type: 'mdxjsEsm',
//         value: importStr,
//         data: {
//           estree: parser.parse(importStr, {
//             sourceType: 'module',
//             ecmaVersion: 'latest'
//           })
//         }
//       })

//       let exportStr = `MDXContent.Layout = ${layout}`
//       tree.children.push({
//         type: 'mdxjsEsm',
//         value: exportStr,
//         data: {
//           estree: parser.parse(exportStr, {
//             sourceType: 'module',
//             ecmaVersion: 'latest',
//             plugins: {
//               'jsx': true
//             }
//           })
//         }
//       })
//     }
//   }
// }

// const preview = () => {
//   return (tree, file) => {
//     console.log('--------------------------');
//     console.log('tree', tree);
//     console.log('--------------------------');
//     console.log(toMarkdown(tree, {
//       extensions: [
//         frontmatterToMarkdown(['yaml', 'toml']),
//         mdxjsEsmToMarkdown,
//         mdxJsxToMarkdown(),
//         gfmTableToMarkdown()
//       ]
//     }))
//     console.log('--------------------------');
//   }
// }

export const remarkPlugins = [
  mdxAnnotations.remark,
  remarkMdx,
  remarkFrontmatter,
  remarkMdxCodeMeta,
  [remarkMdxFrontmatter, {
    name: 'meta'
  }],
  remarkParseFrontmatter,
  remarkGfm,
  [remarkGithub, {
    repository: 'https://github.com/tabler/tabler'
  }],
  remarkMath,
  remarkSmartypants,
  remarkUnwrapImages,
  remarkToc,
  // remarkLayout,
]
