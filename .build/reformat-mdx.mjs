#!/usr/bin/env node

'use strict'

import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url'
import { sync } from 'glob';
import * as prettier from "prettier";

const __dirname = dirname(fileURLToPath(import.meta.url))

const docs = sync(join(__dirname, '..', 'docs', '**', '*.mdx'))

async function formatHTML(htmlString) {
	try {
		const formattedHtml = await prettier.format(htmlString, {
			parser: "html",
			printWidth: 100,
		});
		return formattedHtml;
	} catch (error) {
		console.error("Error formatting HTML:", error);
		return htmlString; // Return original in case of an error
	}
}

async function replaceAsync(str, regex, asyncFn) {
	const matches = [...str.matchAll(regex)];

	const replacements = await Promise.all(
		matches.map(async (match) => asyncFn(...match))
	);

	let result = str;
	matches.forEach((match, i) => {
		result = result.replace(match[0], replacements[i]);
	});

	return result;
}

for (const file of docs) {
	const oldContent = readFileSync(file, 'utf8')

	// get codeblocks from markdown
	const content = await replaceAsync(oldContent, /(```([a-z0-9]+).*?\n)(.*?)(```)/gs, async (m, m1, m2, m3, m4) => {
		if (m2 === 'html') {
			m3 = await formatHTML(m3);

			// remove empty lines
			m3 = m3.replace(/^\s*[\r\n]/gm, '');

			return m1 + m3.trim() + "\n" + m4;
		}
		return m.trim();
	})

	if (content !== oldContent) {
		writeFileSync(file, content, 'utf8')
		console.log(`Reformatted ${file}`)
	}
}