// The CDN snippets the docs hand out, in one place: the page components render them, llms.ts
// re-renders them into the /llms.txt endpoints, and the installation page drops the two tags into
// a full HTML example.
import { site } from '@shared/lib/site.ts'

/** `<link>` for the core stylesheet. */
export const cdnCssTag = (): string => `<link rel="stylesheet" href="${site.cdnUrl}/dist/css/tabler.min.css" />`

/** `<script>` for the core bundle. */
export const cdnJsTag = (): string => `<script src="${site.cdnUrl}/dist/js/tabler.min.js"></script>`

/** Both core tags, as shown by `<CdnImportPackage />`. */
export const cdnPackageSnippet = (): string => `${cdnCssTag()}\n${cdnJsTag()}`

/** `<link>` per plugin stylesheet, as shown by `<CdnImportPlugin />`. */
export const cdnPluginSnippet = (plugins: string[]): string => plugins.map((plugin) => `<link rel="stylesheet" href="${site.cdnUrl}/dist/css/tabler-${plugin}.min.css" />`).join('\n')
