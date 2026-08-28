// MDX → plain markdown, for the /llms.txt endpoints.
//
// The docs are MDX: prose is already markdown, but the parts that carry the most
// value for a reader (the actual Tabler markup) sit inside <Example> slots and
// component props. Stripping components wholesale — the usual llms.txt recipe —
// would delete exactly that. So the components that hold content are unwrapped
// into fenced code blocks instead, and only the decorative ones are dropped.
//
// Prose comes from the MDX source, but example markup comes from the *rendered*
// page (see renderedExamples below): a third of the examples are written with
// docs components — <Icon>, <AvatarList>, <Badge> — and the source form of those
// is of no use to a reader who wants the html.
import type { CollectionEntry } from 'astro:content'
import { render } from 'astro:content'
import { loadRenderers } from 'astro:container'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { getContainerRenderer } from '@astrojs/mdx/container-renderer'
import { beautifyHtml, extractMarkedSnippet } from '@shared/lib/code-example'
import { site } from '@shared/lib/site'
import docs from '@data/docs.json'
import packageManagers from '@data/package-managers.json'
import { cdnCssTag, cdnJsTag, cdnPackageSnippet, cdnPluginSnippet } from './cdn-snippets.ts'

// Lazy raw imports, same as CodeDocs.astro — node:fs paths break once this is
// bundled into dist/.prerender.
const scssSources = import.meta.glob('../../core/scss/**/*.scss', { query: '?raw', import: 'default' })
const jsSources = import.meta.glob('../../core/js/**/*.{js,ts}', { query: '?raw', import: 'default' })

const fence = (code: string, lang = 'html') => `\`\`\`${lang}\n${code.trim()}\n\`\`\``

/**
 * `<Code code={`…`} />` blocks are read as source text, never evaluated, so the few interpolations
 * the docs use inside them are resolved by hand. Anything not listed here is left as written.
 */
function resolveCodeTokens(snippet: string): string {
  const tokens: Record<string, () => string> = {
    '${site.cdnUrl}': () => site.cdnUrl,
    '${cdnCssTag()}': cdnCssTag,
    '${cdnJsTag()}': cdnJsTag,
  }

  return Object.entries(tokens).reduce((text, [token, resolve]) => text.replaceAll(token, resolve()), snippet)
}

/** Strip the common leading indentation from a block and trim blank edges. */
const dedent = (text: string) => {
  const lines = text.replace(/^\n+|\s+$/g, '').split('\n')
  const indents = lines.filter((line) => line.trim()).map((line) => (line.match(/^[ \t]*/)?.[0] ?? '').length)
  const min = indents.length ? Math.min(...indents) : 0
  return lines.map((line) => line.slice(min)).join('\n')
}

/** Replace every match of `pattern`, awaiting an async replacer for each one. */
async function replaceAsync(input: string, pattern: RegExp, replacer: (match: RegExpExecArray) => Promise<string>) {
  const matches = [...input.matchAll(pattern)]
  if (!matches.length) return input

  const replacements = await Promise.all(matches.map((match) => replacer(match as RegExpExecArray)))

  let result = ''
  let last = 0
  matches.forEach((match, index) => {
    result += input.slice(last, match.index) + replacements[index]
    last = (match.index ?? 0) + match[0].length
  })
  return result + input.slice(last)
}

const attr = (tag: string, name: string) => tag.match(new RegExp(`${name}=["']([^"']*)["']`))?.[1] ?? null

/** `<CodeDocs name file />` → the marked snippet from the real source file. */
async function resolveCodeDocs(tag: string): Promise<string> {
  const file = attr(tag, 'file')
  const name = attr(tag, 'name')
  if (!file || !name) return ''

  const extension = file.split('.').pop()
  const kind = extension === 'scss' ? { sources: scssSources, marker: 'scss-docs', lang: 'scss' } : extension === 'ts' || extension === 'js' ? { sources: jsSources, marker: 'js-docs', lang: extension } : null
  if (!kind) return ''

  const load = kind.sources[`../../${file}`]
  if (!load) return ''

  let source = (await load()) as string
  if (kind.lang === 'scss') source = source.replaceAll(' !default', '')

  const snippet = extractMarkedSnippet(source, kind.marker, name)
  return snippet ? `${fence(snippet, kind.lang)}\n\n_Source: \`${file}\`_` : ''
}

// Placeholder sentinel for code that must survive the component stripping below.
// A private-use code point cannot appear in the docs source, so a placeholder can
// never collide with prose.
const SENTINEL = String.fromCharCode(0xe000)
const placeholder = (index: number) => `${SENTINEL}${index}${SENTINEL}`
const placeholderPattern = new RegExp(`${SENTINEL}(\\d+)${SENTINEL}`, 'g')

/**
 * Swap fenced blocks and inline code for placeholders, so the component stripping
 * never reaches inside them. Without this, an `<Alert />` shown as example markup
 * and an `import App from './App.vue'` line in a framework guide would both be
 * deleted as if they were real MDX.
 */
function protectCode(text: string, store: string[]) {
  return text.replace(/```[\s\S]*?```|`[^`\n]*`/g, (match) => {
    store.push(match)
    return placeholder(store.length - 1)
  })
}

/** Placeholders can nest (a rewritten block may contain protected code), so repeat until stable. */
function restoreCode(text: string, store: string[]) {
  let result = text
  while (result.includes(SENTINEL)) {
    const next = result.replace(placeholderPattern, (_match, index: string) => store[Number(index)] ?? '')
    // a sentinel that resolves to nothing would otherwise loop forever
    if (next === result) break
    result = next
  }
  return result
}

// Marker Example.astro puts in front of every example it renders.
const EXAMPLE_MARKER = '<!--EXAMPLE-->'

const decodeEntities = (value: string) =>
  value
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')

// One container for the whole build: creating it loads the MDX renderer.
let container: Promise<AstroContainer> | undefined

const getContainer = () => (container ??= loadRenderers([getContainerRenderer()]).then((renderers) => AstroContainer.create({ renderers })))

/**
 * The final markup of every <Example> on a page, in document order — the same
 * html the page's copy button hands out, so components are already expanded.
 * An entry is null only when the example renders nothing, and the whole list is
 * empty when the page cannot be rendered.
 */
async function renderedExamples(entry: CollectionEntry<'docs'>): Promise<(string | null)[]> {
  try {
    const { Content } = await render(entry)
    const html = await (await getContainer()).renderToString(Content)

    return html
      .split(EXAMPLE_MARKER)
      .slice(1)
      .map((block) => {
        // the copy button, or the wrapper attribute when the example hides its code panel
        const markup = block.match(/data-clipboard-text="([^"]*)"/) ?? block.match(/data-example-markup="([^"]*)"/)
        return markup ? beautifyHtml(decodeEntities(markup[1]!)) : null
      })
  } catch (error) {
    // A page that fails to render still gets its prose and its source-level
    // examples — but the degradation must be visible in the build log.
    console.warn(`[llms] Rendering ${entry.id} failed, examples fall back to their MDX source:`, error)
    return []
  }
}

/**
 * Turn one page's MDX body into plain markdown. `examples` comes from
 * renderedExamples() and replaces the source of each <Example> slot; it is
 * ignored unless it lines up one-to-one with the examples in the source.
 */
export async function mdxToMarkdown(body: string, examples: (string | null)[] = []): Promise<string> {
  // `<Code lang code={`…`} />` first: its template literal contains backticks, which
  // would otherwise be mistaken for markdown code spans by protectCode() below.
  let text = body.replace(/<Code\b[^>]*?code=\{`([\s\S]*?)`\}[\s\S]*?\/>/g, (match, snippet: string) => {
    const lang = attr(match, 'lang') ?? 'html'
    return `\n${fence(resolveCodeTokens(snippet), lang)}\n`
  })

  const code: string[] = []
  // code the page already had, before anything is rewritten
  text = protectCode(text, code)

  // top-level imports are wiring, not content
  text = text.replace(/^import\s+.+?from\s+['"][^'"]+['"];?[ \t]*$/gm, '')

  // <Example> slots hold the markup the page is actually documenting
  const examplePattern = /<Example\b[^>]*>([\s\S]*?)<\/Example>/g
  const useRendered = examples.length === (text.match(examplePattern)?.length ?? 0)
  let exampleIndex = 0
  text = text.replace(examplePattern, (_match, inner: string) => {
    const snippet = (useRendered ? examples[exampleIndex++] : null) ?? dedent(inner)
    return snippet ? `\n${fence(snippet)}\n` : ''
  })

  text = await replaceAsync(text, /<CodeDocs\b[^>]*\/>/g, (match) => resolveCodeDocs(match[0]))

  // install instructions rendered as tabs in the browser
  text = text.replace(/<TabsPackage\b[^>]*\/>/g, (match: string) => {
    const name = attr(match, 'name')
    if (!name) return ''
    const commands = packageManagers.map((manager) => `${manager.command} ${manager.install} ${name}`)
    return `\n${fence(commands.join('\n'), 'shell')}\n`
  })

  text = text.replace(/<CdnImportPackage\b[^>]*\/>/g, () => `\n${fence(cdnPackageSnippet())}\n`)

  text = text.replace(/<CdnImportPlugin\b[^>]*\/>/g, (match: string) => {
    const plugins = [...match.matchAll(/'([^']+)'/g)].map((plugin) => plugin[1]).filter((plugin): plugin is string => Boolean(plugin))
    if (!plugins.length) return ''
    return `\n${fence(cdnPluginSnippet(plugins))}\n`
  })

  // the blocks just produced must be protected too, for the same reason
  text = protectCode(text, code)

  // decorative self-closing components (icons, illustrations, charts, …)
  text = text.replace(/<[A-Z][A-Za-z]*\b[^>]*\/>/g, '')
  // anything else that wraps content: drop the tags, keep what is inside
  text = text.replace(/<\/?[A-Z][A-Za-z]*\b[^>]*>/g, '')
  // MDX comments and leftover JSX expressions
  text = text.replace(/\{\/\*[\s\S]*?\*\/\}/g, '')

  return restoreCode(text, code)
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

async function buildPageMarkdown(entry: CollectionEntry<'docs'>, url: string): Promise<string> {
  const { title, summary, description } = entry.data
  const header = [`# ${title}`, '', `> ${summary}`, '', description, '', `Source: ${url}`, '', '---', ''].join('\n')

  return `${header}\n${await mdxToMarkdown(entry.body ?? '', await renderedExamples(entry))}\n`
}

// Both prerendered consumers ([...slug].md.ts and llms-full.txt.ts) ask for the
// same pages in one build; render each page once and share the promise.
const pageCache = new Map<string, Promise<string>>()

/** A single docs page as a standalone markdown document. */
export function pageMarkdown(entry: CollectionEntry<'docs'>, url: string): Promise<string> {
  const key = `${entry.id}\n${url}`
  let cached = pageCache.get(key)
  if (!cached) {
    cached = buildPageMarkdown(entry, url)
    pageCache.set(key, cached)
  }
  return cached
}

type MenuNode = { url?: string; children?: MenuNode[] }

/**
 * Docs urls in sidebar order — the reading order llms.txt presents, reused by
 * llms-full.txt so the index and the full file agree. Pages missing from the
 * docs.json tree are simply absent; callers append them however they sort.
 */
export function menuOrderedUrls(): string[] {
  const normalize = (url: string) => {
    const parts = url.split('/').filter(Boolean)
    return parts.length ? `/${parts.join('/')}` : '/'
  }
  const walk = (nodes: MenuNode[]): string[] => nodes.flatMap((node) => [...(node.url ? [normalize(node.url)] : []), ...walk(node.children ?? [])])
  return [...new Set(walk(docs.menu as MenuNode[]))]
}

/** Absolute in production, root-relative in dev — same rule as sitemap.xml.ts. */
export const baseUrl = () => (process.env.NODE_ENV === 'development' ? '' : site.docsUrl)
