// The `tabler` skill, byte-identical to what index.json's digest was computed over.
import type { APIRoute } from 'astro'
import { agentSkills } from '@lib/agent-skills'

export const prerender = true

export const GET: APIRoute = () => {
  const skill = agentSkills.find((entry) => entry.name === 'tabler')
  if (!skill) return new Response('Not found', { status: 404 })

  return new Response(skill.content, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  })
}
