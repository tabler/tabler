// Reproduces the wall-clock/UTC date formatting quirks the app's demo data
// depends on. Two things matter for byte-identical output:
//  - unix seconds are shifted by the local timezone offset, so it is NOT the
//    true epoch (the value is derived from the rendered wall clock).
//  - the long-date format uses the UTC wall-clock components of the timestamp.
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

/** Unix seconds shifted by the local timezone offset (not the true epoch). */
export function toUnixSeconds(date: Date): number {
  return Math.floor(date.getTime() / 1000) + date.getTimezoneOffset() * 60
}

/** Formats a date as "Month DD, YYYY" using its UTC components. */
export function formatLongDate(date: Date): string {
  return `${MONTHS[date.getUTCMonth()]} ${String(date.getUTCDate()).padStart(2, '0')}, ${date.getUTCFullYear()}`
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
