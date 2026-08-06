/// <reference types="astro/client" />

// Globals provided by vendor scripts loaded from the page, not by imports.
declare const Typed: new (target: string | Element, options: Record<string, unknown>) => unknown

interface Window {
  TomSelect?: new (target: string | Element | null, options: Record<string, unknown>) => unknown
}
