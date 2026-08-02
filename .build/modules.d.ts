// Minimal ambient typings for build-tool dependencies that ship no types.
// Only the surface used by .build/build-css.ts is declared.
declare module 'rtlcss' {
  import type { Plugin } from 'postcss'
  export default function rtlcss(config?: unknown): Plugin
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
    minify(input: string[]): Promise<Record<string, MinifyResult>>
  }
}
