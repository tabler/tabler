/// <reference types="astro/client" />

// Globals provided by vendor scripts loaded from the page, not by imports.
declare const ClipboardJS: new (
  target: string | Element,
  options?: Record<string, unknown>,
) => {
  on: (event: string, handler: (e: any) => void) => void
}
