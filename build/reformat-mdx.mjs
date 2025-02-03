#!/usr/bin/env node

'use strict'

import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url'
import { sync } from 'glob';
import beautify from 'js-beautify';

const __dirname = dirname(fileURLToPath(import.meta.url))

const docs = sync(join(__dirname, '..', 'docs', '**', '*.mdx'))

docs.forEach((file, i) => {
	const oldContent = readFileSync(file, 'utf8')

	// get codeblocks from markdown
	const content = oldContent.replace(/(```([a-z0-9]+).*?\n)(.*?)(```)/gs, (m, m1, m2, m3, m4) => {
		if (m2 === 'html') {
			// m3 = beautify.default.html(m3, {
			// 	"indent_size": 2,
			// 	"indent_char": " ",
			// }).trim();

			// remove empty lines
			m3 = m3.replace(/^\s*[\r\n]/gm, '');

			return m1 + m3 + "\n" + m4;
		}
		return m
	})

	if (content !== oldContent) {
		writeFileSync(file, content, 'utf8')
		console.log(`Reformatted ${file}`)
	}
})