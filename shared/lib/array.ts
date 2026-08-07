// Indexes into demo-data arrays (people.json, photos.json, …) that pages trust to have
// an entry at a given position. Throws instead of silently rendering `undefined` if that
// assumption is ever violated (e.g. a seed file shrinks).

export function requireIndex<T>(array: readonly T[], index: number): T {
  const item = array[index]
  if (item === undefined) {
    throw new Error(`Expected an entry at index ${index}, got undefined (array has ${array.length} entries)`)
  }
  return item
}
