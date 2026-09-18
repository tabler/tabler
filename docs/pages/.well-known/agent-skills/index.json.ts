// Agent Skills Discovery index: which skills this site publishes and where.
import type { APIRoute } from 'astro'
import { AGENT_SKILLS_SCHEMA, agentSkills } from '@lib/agent-skills'

export const prerender = true

export const GET: APIRoute = () => {
  const body = {
    $schema: AGENT_SKILLS_SCHEMA,
    skills: agentSkills.map(({ name, description, url, digest }) => ({ name, type: 'skill-md', description, url, digest })),
  }

  return new Response(`${JSON.stringify(body, null, 2)}\n`, {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  })
}
