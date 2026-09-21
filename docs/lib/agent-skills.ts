// The agent skills the docs publish under /.well-known/agent-skills/ (Agent
// Skills Discovery RFC 0.2.0, https://github.com/cloudflare/agent-skills-discovery-rfc).
// The markdown lives next to this file; the `${site.*}` tokens in it are resolved
// here so the skill and the rest of the docs quote the same urls and cdn version.
import { createHash } from 'node:crypto'
import { site } from '@shared/lib/site'
import { cdnPackageSnippet } from './cdn-snippets.ts'
import tablerSource from './agent-skills/tabler/SKILL.md?raw'

export const AGENT_SKILLS_SCHEMA = 'https://schemas.agentskills.io/discovery/0.2.0/schema.json'

const tokens: Record<string, string> = {
  '${site.docsUrl}': site.docsUrl,
  '${site.cdnUrl}': site.cdnUrl,
  '${site.previewUrl}': site.previewUrl,
  // same tags as the docs and llms.txt, with the SRI attributes when the hashes are current
  '${cdnPackageSnippet()}': cdnPackageSnippet(),
}

const resolveTokens = (text: string) => Object.entries(tokens).reduce((result, [token, value]) => result.replaceAll(token, value), text)

const frontmatterField = (text: string, field: string) => text.match(new RegExp(`^${field}:\\s*(.+)$`, 'm'))?.[1]?.trim() ?? ''

export type AgentSkill = {
  name: string
  description: string
  /** the exact bytes served at `url`; the digest is computed over them */
  content: string
  url: string
  digest: string
}

const define = (source: string): AgentSkill => {
  const content = resolveTokens(source)
  const name = frontmatterField(content, 'name')
  return {
    name,
    description: frontmatterField(content, 'description'),
    content,
    url: `/.well-known/agent-skills/${name}/SKILL.md`,
    digest: `sha256:${createHash('sha256').update(content).digest('hex')}`,
  }
}

export const agentSkills: AgentSkill[] = [define(tablerSource)]
