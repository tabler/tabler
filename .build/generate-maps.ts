#!/usr/bin/env tsx

/**
 * Generates the map files of the VectorMap plugin (`core/js/maps/*.ts`) from
 * Natural Earth (https://www.naturalearthdata.com, public domain).
 *
 * The shapes are projected here, at build time, and written as ready SVG path
 * data. The plugin only puts them into an `<svg>`, so no geo library ships to
 * the browser.
 *
 * Usage: pnpm run generate:maps
 */

import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import * as prettier from 'prettier'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '..', 'core', 'js', 'maps')

// Pinned, so that a new run gives the same file.
const SOURCE = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/v5.1.2/geojson'

type Position = [number, number]
type Ring = Position[]

interface Feature {
  properties: Record<string, string | number | null>
  geometry: { type: 'Polygon'; coordinates: Ring[] } | { type: 'MultiPolygon'; coordinates: Ring[][] }
}

interface MapConfig {
  /** File name in `core/js/maps/` and the name the map is registered under */
  name: string
  /** Natural Earth file, without the extension */
  source: string
  /** Width of the viewBox; the height follows from the projection */
  width: number
  /** Region codes left out of the map */
  exclude: string[]
}

const maps: MapConfig[] = [
  {
    name: 'world',
    source: 'ne_110m_admin_0_countries',
    width: 1000,
    exclude: ['AQ'],
  },
]

// Territories with no ISO 3166-1 code in Natural Earth, keyed by `ADM0_A3`.
// `XK` is the code Kosovo uses in practice; the other two are user-assigned.
const CODE_OVERRIDES: Record<string, string> = {
  KOS: 'XK',
  CYN: 'XC',
  SOL: 'XS',
}

// One decimal place in a 1000 unit wide viewBox is about 0.04° of longitude,
// well below the detail of the 110m data.
const PRECISION = 10

const RADIANS = Math.PI / 180

/**
 * Miller cylindrical projection, in radians. Placing a point on the map by its
 * coordinates takes the same formula, which is why `projection` is written
 * into the map file.
 */
const miller = ([lng, lat]: Position): Position => [lng * RADIANS, 1.25 * Math.log(Math.tan(Math.PI / 4 + 0.4 * lat * RADIANS))]

const regionCode = (properties: Feature['properties']): string | null => {
  const override = CODE_OVERRIDES[String(properties.ADM0_A3)]
  if (override) {
    return override
  }

  // `ISO_A2` is "-99" for France and Norway; `ISO_A2_EH` has them right.
  for (const key of ['ISO_A2_EH', 'ISO_A2']) {
    const code = String(properties[key] ?? '')
    if (/^[A-Z]{2}$/.test(code)) {
      return code
    }
  }

  return null
}

const ringsOf = (geometry: Feature['geometry']): Ring[] => (geometry.type === 'Polygon' ? geometry.coordinates : geometry.coordinates.flat())

// "0.5" → ".5", "-0.5" → "-.5"
const formatNumber = (tenths: number): string => String(tenths / PRECISION).replace(/^(-?)0\./, '$1.')

// A minus sign already separates two numbers, so a space is only needed in
// front of a positive one.
const joinNumbers = (numbers: number[]): string => {
  let out = ''
  for (const number of numbers) {
    const text = formatNumber(number)
    out += out && !text.startsWith('-') ? ` ${text}` : text
  }

  return out
}

/**
 * One ring as path data: an absolute move, then relative lines. The deltas are
 * taken between already rounded points, so rounding does not add up.
 */
const ringPath = (points: Position[]): string => {
  const rounded: Position[] = []
  for (const [x, y] of points) {
    const point: Position = [Math.round(x * PRECISION), Math.round(y * PRECISION)]
    const last = rounded.at(-1)
    if (!last || last[0] !== point[0] || last[1] !== point[1]) {
      rounded.push(point)
    }
  }

  // GeoJSON repeats the first point at the end; `z` closes the ring instead.
  const first = rounded[0]
  const last = rounded.at(-1)
  if (rounded.length > 1 && first && last && first[0] === last[0] && first[1] === last[1]) {
    rounded.pop()
  }

  if (rounded.length < 3) {
    return ''
  }

  const deltas: number[] = []
  for (let i = 1; i < rounded.length; i++) {
    deltas.push(rounded[i][0] - rounded[i - 1][0], rounded[i][1] - rounded[i - 1][1])
  }

  return `M${joinNumbers(rounded[0])}l${joinNumbers(deltas)}z`
}

async function generate(config: MapConfig): Promise<void> {
  const url = `${SOURCE}/${config.source}.geojson`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Could not load ${url}: ${response.status}`)
  }

  const { features } = (await response.json()) as { features: Feature[] }

  const regions: { code: string; name: string; rings: Ring[] }[] = []
  for (const feature of features) {
    const code = regionCode(feature.properties)
    if (!code) {
      console.warn(`  skipped "${feature.properties.NAME}": no region code`)
      continue
    }

    if (config.exclude.includes(code)) {
      continue
    }

    regions.push({
      code,
      name: String(feature.properties.NAME_LONG ?? feature.properties.NAME),
      rings: ringsOf(feature.geometry).map((ring) => ring.map(miller)),
    })
  }

  const duplicate = regions.find((region, index) => regions.findIndex((other) => other.code === region.code) !== index)
  if (duplicate) {
    throw new Error(`Region code "${duplicate.code}" is used twice`)
  }

  // Fit the projected shapes into the viewBox. The y axis points down in SVG.
  let [minX, minY, maxX, maxY] = [Infinity, Infinity, -Infinity, -Infinity]
  for (const [x, y] of regions.flatMap((region) => region.rings.flat())) {
    minX = Math.min(minX, x)
    maxX = Math.max(maxX, x)
    minY = Math.min(minY, y)
    maxY = Math.max(maxY, y)
  }

  const scale = config.width / (maxX - minX)
  const translate: Position = [-minX * scale, maxY * scale]
  const height = Math.ceil((maxY - minY) * scale)
  const round = (value: number): number => Math.round(value * 1000) / 1000

  regions.sort((a, b) => a.code.localeCompare(b.code))

  const data = {
    width: config.width,
    height,
    projection: { type: 'miller', scale: round(scale), translate: translate.map(round) },
    regions: Object.fromEntries(
      regions.map((region) => {
        const path = region.rings.map((ring) => ringPath(ring.map(([x, y]): Position => [x * scale + translate[0], translate[1] - y * scale]))).join('')

        if (!path) {
          throw new Error(`Region "${region.code}" has no shape left after rounding`)
        }

        return [region.code, { name: region.name, path }]
      }),
    ),
  }

  const source = `// Generated by \`pnpm run generate:maps\` from Natural Earth (public domain,
// https://www.naturalearthdata.com). Do not edit by hand.

import type { VectorMapData } from '../src/vector-map'

export const ${config.name}: VectorMapData = ${JSON.stringify(data)}
`

  const file = join(outDir, `${config.name}.ts`)
  const options = await prettier.resolveConfig(file)
  const formatted = await prettier.format(source, { ...options, filepath: file })
  writeFileSync(file, formatted)

  console.log(`✓ ${config.name}: ${regions.length} regions, ${config.width}x${height}, ${(formatted.length / 1024).toFixed(1)} kB`)
}

async function main(): Promise<void> {
  for (const config of maps) {
    await generate(config)
  }
}

main().catch((error: unknown) => {
  console.error(error)
  process.exit(1)
})
