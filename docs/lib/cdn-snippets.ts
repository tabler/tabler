// The CDN snippets the docs hand out, in one place: the page components render them, llms.ts
// re-renders them into the /llms.txt endpoints, and the installation page drops the two tags into
// a full HTML example.
import { site } from '@shared/lib/site.ts'
import sri from '@data/sri.json'

/**
 * `integrity` and `crossorigin` for a file of the published core package, so the browser can
 * verify what the CDN sent. The hashes in shared/data/sri.json come from `pnpm run generate-sri`;
 * until that runs for the current version the tags are rendered without them, rather than with a
 * hash that would make the browser block the file.
 */
const sriAttrs = (file: string): string => {
  const hash = sri.version === site.version ? (sri.files as Record<string, string>)[file] : undefined

  return hash ? ` integrity="${hash}" crossorigin="anonymous"` : ''
}

/** `<link>` for one stylesheet of the core package, by its path inside the package. */
const cdnLinkTag = (file: string): string => `<link rel="stylesheet" href="${site.cdnUrl}/${file}"${sriAttrs(file)} />`

/** `<script>` for one script of the core package, by its path inside the package. */
const cdnScriptTag = (file: string): string => `<script src="${site.cdnUrl}/${file}"${sriAttrs(file)}></script>`

/** `<link>` for the core stylesheet. */
export const cdnCssTag = (): string => cdnLinkTag('dist/css/tabler.min.css')

/** `<script>` for the core bundle. */
export const cdnJsTag = (): string => cdnScriptTag('dist/js/tabler.min.js')

/** `<script>` for the color mode script, as shown on the Color modes page. */
export const cdnThemeJsTag = (): string => cdnScriptTag('dist/js/tabler-theme.min.js')

/** Both core tags, as shown by `<CdnImportPackage />`. */
export const cdnPackageSnippet = (): string => `${cdnCssTag()}\n${cdnJsTag()}`

/** `<link>` per plugin stylesheet, as shown by `<CdnImportPlugin />`. */
export const cdnPluginSnippet = (plugins: string[]): string => plugins.map((plugin) => cdnLinkTag(`dist/css/tabler-${plugin}.min.css`)).join('\n')
