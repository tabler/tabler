# Tabler agent skills

The skills in this directory are for people who build with Tabler. Install them with the [skills](https://skills.sh) CLI:

```sh
npx skills add tabler/tabler
```

- `tabler` - build dashboards and app UIs with Tabler, reading the real docs instead of guessing class names.
- `tabler-upgrade` - upgrade a project to the latest `@tabler/core` release by following the upgrade guides.

In Claude Code the same two skills are a plugin, with the manifest in `.claude-plugin/` here:

```text
/plugin install tabler --marketplace tabler/tabler
```

Do not edit these files. Each `SKILL.md` is generated from `docs/lib/agent-skills/<name>/SKILL.md` by `pnpm run generate:agent-skills`, so the skill quotes the same urls and CDN version as the documentation, which publishes the same file under `https://docs.tabler.io/.well-known/agent-skills/`. The skills for working on this repository live in `.agents/skills/`.
