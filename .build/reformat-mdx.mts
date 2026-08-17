#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { sync } from 'glob'
import * as prettier from 'prettier'
import { compile } from '@mdx-js/mdx'

const __dirname = dirname(fileURLToPath(import.meta.url))

const docs: string[] = sync(join(__dirname, '..', 'docs', 'content', '**', '*.mdx'))

// Finding nothing means the docs moved and this glob was not updated. Exiting 0
// with no output would look like "everything is already formatted".
if (docs.length === 0) {
  console.error('No docs pages found — check the glob in this script.')
  process.exit(1)
}

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
 * new paragraph. Raw text lines are fine — the docs pipeline unwraps the
 * paragraphs MDX wraps them in (see docs/lib/remark-unwrap-jsx-paragraphs.mjs).
 *
 * Prettier's whitespace-sensitive close artifacts (`</a` + a lone `>`, or a
 * line starting with `>label`) do not parse in every MDX position, so the
 * bracket is folded back onto the previous line — whitespace inside a tag,
 * no rendering change. The real MDX compiler then has the final word: an
 * example whose formatted form it rejects keeps its original form.
 */
async function formatExamples(source: string): Promise<string> {
  return replaceAsync(source, /(<Example\b[^>]*>\n)([\s\S]*?)(\n<\/Example>)/g, async (_m: string, open: string, inner: string, close: string) => {
    if (inner.includes('{')) return _m

    const formatted = (await formatHTML(inner, { embeddedLanguageFormatting: 'off' }))
      .replace(/^\s*[\r\n]/gm, '')
      .replace(/(<\/[\w.-]+)\s*\n\s*>/g, '$1>')
      .replace(/\s*\n\s*>(?=\S)/g, '>')
      .trim()
    if (!formatted) return _m

    if (!(await compilesAsMdx(open + formatted + close))) {
      console.warn(`Left one example as-is (MDX cannot parse the formatted form)`)
      return _m
    }

    return open + formatted + close
  })
}

async function compilesAsMdx(source: string): Promise<boolean> {
  try {
    await compile(source)
    return true
  } catch {
    return false
  }
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
