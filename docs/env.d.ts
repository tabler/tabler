/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    /** set by docs/lib/llms.ts while rendering a page for its .md mirror; <MarkdownSource /> emits only then */
    markdownMirror?: boolean
  }
}
