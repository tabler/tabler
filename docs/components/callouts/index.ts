// The callout components every MDX page can use without importing them itself.
// Both the page route and the llms.txt renderer pass this map to <Content />,
// so a page that uses <Warning> renders the same in either.
import Danger from './Danger.astro'
import Info from './Info.astro'
import Note from './Note.astro'
import Tip from './Tip.astro'
import Warning from './Warning.astro'

export const callouts = { Danger, Info, Note, Tip, Warning }
