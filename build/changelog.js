#!/usr/bin/env node

'use strict'

const fs = require('fs'),
	path = require('path'),
	YAML = require('yaml');

const content = YAML.parse(fs.readFileSync(path.join(__dirname, '../src/pages/_data/changelog.yml'), 'utf8')).reverse()
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

fs.writeFileSync(path.join(__dirname, '../CHANGELOG.md'), readme)