#!/usr/bin/env node

'use strict'

const fs = require('fs'),
	path = require('path'),
	glob = require('glob'),
	prettier = require('prettier');

const docs = glob
	.sync(path.join(__dirname, `../docs/**/*.mdx`))

docs.forEach((file, i) => {
	const oldContent = fs.readFileSync(file, 'utf8')

	// get codeblocks from markdown
	const content = oldContent.replace(/(```.*?\n)(.*?)(```)/gs, (m, m1, m2, m3) => {
		const m2m = prettier.format(m2, {
			semi: false,
			singleQuote: true,
			// parser: 'babel'
		}).trim();

		return m1 + m2m + "\n" + m3;
	})

	if (content !== oldContent) {
		fs.writeFileSync(file, content, 'utf8')
		console.log(`Reformatted ${file}`)
	}
})