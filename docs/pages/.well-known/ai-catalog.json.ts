// Agentic Resource Discovery manifest (https://agenticresourcediscovery.org):
// the machine-readable resources this site offers, so registries can index
// them. Everything listed here already exists elsewhere on the site.
import type { APIRoute } from 'astro'
import { site } from '@shared/lib/site'
import { agentSkills } from '@lib/agent-skills'

export const prerender = true

const domain = new URL(site.docsUrl).hostname
const urn = (namespace: string, name: string) => `urn:air:${domain}:${namespace}:${name}`

export const GET: APIRoute = () => {
  const body = {
    specVersion: '1.0',
    host: {
      displayName: site.title,
      identifier: `did:web:${domain}`,
      url: site.docsUrl,
    },
    entries: [
      {
        identifier: urn('docs', 'llms-txt'),
        displayName: 'Tabler documentation index (llms.txt)',
        description: 'Index of every documentation page with a one-line summary, links to the markdown version of each page and a class reference for every component.',
        type: 'text/markdown',
        url: `${site.docsUrl}/llms.txt`,
        representativeQueries: ['Which components does Tabler have?', 'What classes does the Tabler card component use?', 'Where is the Tabler documentation for forms?'],
      },
      {
        identifier: urn('docs', 'llms-full-txt'),
        displayName: 'Tabler documentation, full text (llms-full.txt)',
        description: 'The whole Tabler documentation as a single markdown file, including the markup of every example.',
        type: 'text/markdown',
        url: `${site.docsUrl}/llms-full.txt`,
        representativeQueries: ['Give me the complete Tabler documentation', 'How do I build a dashboard layout with Tabler?', 'Show the markup of a Tabler modal'],
      },
      ...agentSkills.map((skill) => ({
        identifier: urn('skills', skill.name),
        displayName: `Agent skill: ${skill.name}`,
        description: skill.description,
        type: 'text/markdown',
        url: `${site.docsUrl}${skill.url}`,
        representativeQueries: ['Build an admin dashboard with Tabler', 'Install Tabler in my project', 'Which Tabler classes should I use for a settings page?'],
      })),
      {
        identifier: urn('docs', 'sitemap'),
        displayName: 'Sitemap',
        description: 'Every html page of the documentation.',
        type: 'application/xml',
        url: `${site.docsUrl}/sitemap.xml`,
        representativeQueries: ['List all Tabler documentation pages', 'Crawl the Tabler docs'],
      },
    ],
  }

  return new Response(`${JSON.stringify(body, null, 2)}\n`, {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  })
}
