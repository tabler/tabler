#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { sync } from 'glob'
import * as prettier from 'prettier'

const __dirname = dirname(fileURLToPath(import.meta.url))

const docs: string[] = sync(join(__dirname, '..', 'docs', 'pages', '**', '*.mdx'))

async function formatHTML(htmlString: string, options: prettier.Options = {}): Promise<string> {
  try {
    const formattedHtml = await prettier.format(htmlString, {
      parser: 'html',
      printWidth: 100,
      ...options,
    })
    return formattedHtml
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error('Error formatting HTML:', errorMessage)
    return htmlString // Return original in case of an error
  }
}

async function replaceAsync(str: string, regex: RegExp, asyncFn: (...args: string[]) => Promise<string>): Promise<string> {
  const matches = [...str.matchAll(regex)]

  const replacements = await Promise.all(matches.map(async (match: RegExpMatchArray) => asyncFn(...(match as unknown as string[]))))

  // Splice by match index. A string `.replace()` would hit the first occurrence
  // every time, so two identical examples in one file would rewrite the same
  // spot twice and leave the other untouched.
  let result = ''
  let last = 0
  matches.forEach((match: RegExpMatchArray, i: number) => {
    const start = match.index ?? 0
    result += str.slice(last, start) + replacements[i]
    last = start + match[0].length
  })

  return result + str.slice(last)
}

/**
 * `<Example>` slots hold the demo markup, so they get the same treatment as an
 * ```html fence.
 *
 * Slots containing `{` are skipped. In MDX every unescaped brace is a JSX
 * expression — a component prop (`title={…}`), or the template literal that
 * `<script>` and `<style>` demos are wrapped in so their JS/CSS braces survive.
 * The html parser either throws on those ("Opening tag not terminated") or
 * reformats the embedded code and breaks the expression. Embedded formatting is
 * off as a second guard.
 *
 * Empty lines are stripped: a blank line inside the slot would make MDX start a
 * new paragraph and wrap the demo markup in a stray `<p>`.
 */
async function formatExamples(source: string): Promise<string> {
  return replaceAsync(source, /(<Example\b[^>]*>\n)([\s\S]*?)(\n<\/Example>)/g, async (_m: string, open: string, inner: string, close: string) => {
    // A space between two tags on one line is rendered, but JSX drops whitespace
    // that contains a newline. Reflowing such an example would silently delete the
    // gaps between, say, a row of buttons, so it is left alone.
    if (inner.includes('{') || />[ \t]+</.test(inner)) return _m

    // A line that does not start with a tag is markdown flow content: MDX renders
    // it as its own <p>. Reflowing would fold it into a tag line and drop the
    // paragraph, so those examples are left alone too.
    const lines = inner.split('\n').filter((line) => line.trim())
    if (!lines.every((line) => line.trim().startsWith('<'))) return _m

    const formatted = (await formatHTML(inner, { embeddedLanguageFormatting: 'off' })).replace(/^\s*[\r\n]/gm, '').trim()

    // Only take the result when every line starts with a tag. MDX parses the slot
    // as markdown flow content, so a line starting with anything else changes what
    // is rendered: text becomes a stray <p>, and prettier's inline-close artifact
    // (`</a` then a lone `>`) is not valid JSX at all. Where prettier cannot format
    // without breaking inline content, the example is left exactly as it was.
    const isSafe = formatted.split('\n').every((line) => line.trim().startsWith('<'))

    return formatted && isSafe ? open + formatted + close : _m
  })
}

async function processFiles(): Promise<void> {
  for (const file of docs) {
    const oldContent = readFileSync(file, 'utf8')

    // get codeblocks from markdown
    let content = await replaceAsync(oldContent, /(```([a-z0-9]+).*?\n)(.*?)(```)/gs, async (m: string, m1: string, m2: string, m3: string, m4: string) => {
      if (m2 === 'html') {
        let formattedHtml = await formatHTML(m3)

        // remove empty lines
        formattedHtml = formattedHtml.replace(/^\s*[\r\n]/gm, '')

        return m1 + formattedHtml.trim() + '\n' + m4
      }
      return m.trim()
    })

    content = await formatExamples(content)

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
