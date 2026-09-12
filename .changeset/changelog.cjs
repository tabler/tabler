/**
 * Changelog generator for Tabler.
 *
 * Same as `@changesets/cli/changelog`, except it drops the
 * "Updated dependencies [...]" block. `@tabler/core`, `@tabler/preview` and
 * `@tabler/docs` are a linked group, so they always share one version number —
 * listing every core changeset commit in the preview and docs changelogs added
 * a hundred lines that said nothing the version number does not already say.
 */

const getReleaseLine = async (changeset) => {
  const [firstLine, ...futureLines] = changeset.summary.split('\n').map((line) => line.trimEnd())

  let releaseLine = `- ${changeset.commit ? `${changeset.commit.slice(0, 7)}: ` : ''}${firstLine}`

  if (futureLines.length > 0) {
    releaseLine += `\n${futureLines.map((line) => `  ${line}`).join('\n')}`
  }

  return releaseLine
}

const getDependencyReleaseLine = async () => ''

module.exports = {
  getReleaseLine,
  getDependencyReleaseLine,
}
