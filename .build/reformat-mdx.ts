#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { sync } from 'glob'
import * as prettier from 'prettier'

const __dirname = dirname(fileURLToPath(import.meta.url))

const docs: string[] = sync(join(__dirname, '..', 'docs', '**', '*.md'))

async function formatHTML(htmlString: string): Promise<string> {
	try {
		const formattedHtml = await prettier.format(htmlString, {
			parser: 'html',
			printWidth: 100,
		})
		return formattedHtml
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error)
		console.error('Error formatting HTML:', errorMessage)
		return htmlString // Return original in case of an error
	}
}

async function replaceAsync(
	str: string,
	regex: RegExp,
	asyncFn: (...args: string[]) => Promise<string>
): Promise<string> {
	const matches = [...str.matchAll(regex)]

	const replacements = await Promise.all(
		matches.map(async (match: RegExpMatchArray) => asyncFn(...match))
	)

	let result = str
	matches.forEach((match: RegExpMatchArray, i: number) => {
		result = result.replace(match[0], replacements[i])
	})

	return result
}

async function processFiles(): Promise<void> {
	for (const file of docs) {
		const oldContent = readFileSync(file, 'utf8')

		// get codeblocks from markdown
		const content = await replaceAsync(
			oldContent,
			/(```([a-z0-9]+).*?\n)(.*?)(```)/gs,
			async (m: string, m1: string, m2: string, m3: string, m4: string) => {
				if (m2 === 'html') {
					let formattedHtml = await formatHTML(m3)

					// remove empty lines
					formattedHtml = formattedHtml.replace(/^\s*[\r\n]/gm, '')

					return m1 + formattedHtml.trim() + '\n' + m4
				}
				return m.trim()
			}
		)

		if (content !== oldContent) {
			writeFileSync(file, content, 'utf8')
			console.log(`Reformatted ${file}`)
		}
	}
}

processFiles().catch((error) => {
	const errorMessage = error instanceof Error ? error.message : String(error)
	console.error('Error processing files:', errorMessage)
	process.exit(1)
})

