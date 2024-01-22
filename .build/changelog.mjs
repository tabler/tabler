#!/usr/bin/env node

'use strict'

const content = YAML.parse(fs.readFileSync(path.join(__dirname, '../preview/pages/_data/changelog.yml', 'utf8'))).reverse()

let readme = `# Changelog

All notable changes to this project will be documented in this file.\n`

content.forEach((change) => {
	readme += `\n\n## \`${change.version}\` - ${change.date}\n\n`

	if (change.description) {
		readme += `**${change.description}**\n\n`
	}

	change.changes.forEach((line) => {
		readme += `- ${line}\n`
	})

	console.log(change.version);
})

console.log(readme);

// fs.writeFileSync('CHANGELOG.md', readme)