// Minimal ambient typings for build-tool dependencies that ship no types.
// Only the surface used by .build/build-css.ts is declared.
declare module 'rtlcss' {
  import type { Plugin } from 'postcss'
  export default function rtlcss(config?: unknown): Plugin
}

declare module 'postcss-prefix-custom-properties' {
  import type { Plugin } from 'postcss'
  export default function prefixCustomProperties(options?: { prefix?: string; ignore?: (string | RegExp)[] }): Plugin
}

declare module 'clean-css' {
  interface MinifyResult {
    styles: string
    errors: string[]
    warnings: string[]
    sourceMap: { toString(): string }
  }
  export default class CleanCSS {
    constructor(options: Record<string, unknown>)
    // Batch mode: either file paths, or a map of absolute path -> source
    // (with its input map), keyed the same way in the result.
    minify(input: string[] | Record<string, { styles: string; sourceMap?: string }>): Promise<Record<string, MinifyResult>>
  }
}
