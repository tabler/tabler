#!/usr/bin/env node

'use strict'

const fs = require('fs'),
	path = require('path'),
	glob = require('glob'),
	beautifyHtml = require('js-beautify').html;

const docs = glob
	.sync(path.join(__dirname, `../docs/**/*.mdx`))

docs.forEach((file, i) => {
	const oldContent = fs.readFileSync(file, 'utf8')

	// get codeblocks from markdown
	const content = oldContent.replace(/(```([a-z0-9]+).*?\n)(.*?)(```)/gs, (m, m1, m2, m3, m4) => {
		if (m2 === 'html') {
			let m3m = beautifyHtml(m3, {
				"indent_size": 2,
				"indent_char": " ",
			}).trim();

			// remove empty lines
			m3m = m3m.replace(/^\s*[\r\n]/gm, '');

			return m1 + m3m + "\n" + m4;
		}
		return m
	})

	if (content !== oldContent) {
		fs.writeFileSync(file, content, 'utf8')
		console.log(`Reformatted ${file}`)
	}
})