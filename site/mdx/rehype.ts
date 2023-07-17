import { visit } from 'unist-util-visit'
import { mdxAnnotations } from 'mdx-annotations'
import rehypeMdxTitle from 'rehype-mdx-title'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { slugifyWithCounter } from '@sindresorhus/slugify'
import { toString } from 'mdast-util-to-string'
import rehypeExternalLinks from 'rehype-external-links'

function rehypeSlugify() {
  return tree => {
    let slugify = slugifyWithCounter()
    visit(tree, 'element', node => {
      if ((node.tagName === 'h2' || node.tagName === 'h3') && !node.properties.id) {
        node.properties.id = slugify(toString(node))
      }
    })
  } 
}


export const rehypePlugins = [
  mdxAnnotations.rehype,
  rehypeSlugify,
  rehypeAutolinkHeadings,
  [rehypeExternalLinks, { target: '_blank', rel: ['nofollow'] }],
  rehypeMdxTitle,
]
