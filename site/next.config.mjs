import { withContentlayer } from "next-contentlayer"
import fs from 'fs-extra'

import "./env.mjs"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  experimental: {
  },
  async redirects() {
    return JSON.parse(fs.readFileSync('./redirects.json'))
  },
}

export default withContentlayer(nextConfig)
