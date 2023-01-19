import nextMDX from '@next/mdx'
import { remarkPlugins } from './mdx/remark.mjs'
import { rehypePlugins } from './mdx/rehype.mjs'

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
	 providerImportSource: '@mdx-js/react',
	 remarkPlugins,
	 rehypePlugins,
  },
})

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'mdoc'],
  async redirects() {
	 return [
		{
		  source: '/',
		  destination: '/docs',
		  permanent: false,
		},
	 ]
  },
}

export default withMDX(nextConfig)
