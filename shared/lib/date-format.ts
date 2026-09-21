// Demo data is rendered at build time, so every formatter reads UTC components
// and never the local timezone — output must match between CI and local builds.
const SHORT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

/** Unix epoch seconds, independent of the build machine's timezone. */
export function toUnixSeconds(date: Date): number {
  return Math.floor(date.getTime() / 1000)
}

/** Formats a date as "Month DD, YYYY" using its UTC components. */
export function formatLongDate(date: Date): string {
  return `${MONTHS[date.getUTCMonth()]} ${String(date.getUTCDate()).padStart(2, '0')}, ${date.getUTCFullYear()}`
}

/** Formats a date as "D Mon" using its UTC components, e.g. "27 Aug". */
export function formatShortDate(date: Date): string {
  return `${date.getUTCDate()} ${SHORT_MONTHS[date.getUTCMonth()]}`
}

/** Reformats a commit-style timestamp ("Thu Nov 28 08:48:33 2025 +0100") to "28 Nov 2025". */
export function formatCommitDate(date: string): string {
  const m = date.match(/^\w+ (\w+) (\d+) [\d:]+ (\d+)/)
  return m ? `${m[2]} ${m[1]} ${m[3]}` : date
}

function pad(n: number): string {
  return String(n).padStart(2, '0')
}

/** Formats a date as "YYYY-MM-DD HH:MM +0000" in UTC. */
export function formatUtcTimestamp(date: Date): string {
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())} ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())} +0000`
}
