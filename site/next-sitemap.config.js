const uiUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3010' : 'https://tabler.io'

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: uiUrl || '',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
  exclude: ['/samples', '/login', '/test'],
}
