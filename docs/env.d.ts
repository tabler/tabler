/// <reference types="astro/client" />

// clipboard.js, loaded via a page lib (libs.json) as a classic <script> global, not an
// npm package — declared ambiently so `astro check` can resolve it in DocsLayout's copy script.
declare var ClipboardJS: new (selector: Element, options: Record<string, unknown>) => { on(event: string, callback: (e: { clearSelection(): void; trigger: HTMLElement }) => void): void }
