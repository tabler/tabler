import { withContentlayer } from "next-contentlayer"
import fs from 'fs-extra'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  experimental: {
    appDir: true
  },
  async redirects() {
    return JSON.parse(fs.readFileSync('./redirects.json'))
  },
}

export default withContentlayer(nextConfig)

// import nextMDX from '@next/mdx'
// import { remarkPlugins } from './mdx/remark.mjs'
// import { rehypePlugins } from './mdx/rehype.mjs'
// import { recmaPlugins } from './mdx/recma.mjs'
// import fs from 'fs-extra'

// const redirects = JSON.parse(fs.readFileSync('./redirects.json'))

// /** @type {import('next').NextConfig} */
// const withMDX = nextMDX({
//   extension: /\.mdx?$/,
//   options: {
//     providerImportSource: '@mdx-js/react',
//     remarkPlugins,
//     rehypePlugins,
//     recmaPlugins
//   }
// })

// const nextConfig = {
//   reactStrictMode: false,
//   swcMinify: true,
//   pageExtensions: ['js', 'jsx', 'md', 'mdx', 'mdoc'],
//   images: {
//     imageSizes: [48, 96, 286, 480, 510, 552, 556, 572, 960, 1020, 1040, 1112, 2080]
//   },
//   async redirects() {
//     return redirects
//   },
//   webpack(config, options) {
//     config.resolve = {
//       ...config.resolve,
//       fallback: {
//         fs: false,
//         path: false,
//         os: false
//       }
//     }

//     return config
//   }
// }

// export default withMDX(nextConfig)
