#!/usr/bin/env node
// Regenerate shared/data/icons.json and icons-info.json from the installed
// @tabler/icons package. `pnpm run import-icons` refreshes the data files from
// the installed version; `pnpm run update-icons` bumps the package first.
import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

interface IconTag {
  styles: {
    outline?: unknown
    filled?: unknown
  }
}

interface IconEntry {
  name: string
  svg: {
    outline: string | null
    filled: string | null
  }
}

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(__dirname, '..')

const iconsPackage = join(repoRoot, 'node_modules/@tabler/icons')
const iconsTags: Record<string, IconTag> = JSON.parse(readFileSync(join(iconsPackage, 'icons.json'), 'utf8'))
const { version }: { version: string } = JSON.parse(readFileSync(join(iconsPackage, 'package.json'), 'utf8'))

const prepareSvgFile = (svg: string): string => {
  return svg.replace(/\n/g, '').replace(/>\s+</g, '><').replace(/\s+/g, ' ')
}

const svgList: Record<string, IconEntry> = {}
for (const iconName in iconsTags) {
  const iconData = iconsTags[iconName]
  svgList[iconName] = {
    name: iconName,
    svg: {
      outline: iconData.styles.outline ? prepareSvgFile(readFileSync(join(iconsPackage, `icons/outline/${iconName}.svg`), 'utf8')) : null,
      filled: iconData.styles.filled ? prepareSvgFile(readFileSync(join(iconsPackage, `icons/filled/${iconName}.svg`), 'utf8')) : null,
    },
  }
}

writeFileSync(
  join(repoRoot, 'shared/data/icons-info.json'),
  JSON.stringify({
    version,
    count: Object.values(svgList).reduce((acc, icon) => {
      return acc + (icon.svg.outline ? 1 : 0) + (icon.svg.filled ? 1 : 0)
    }, 0),
  }),
)

writeFileSync(join(repoRoot, 'shared/data/icons.json'), JSON.stringify(svgList))

console.log(`import-icons: imported ${Object.keys(svgList).length} icons from @tabler/icons v${version}`)
