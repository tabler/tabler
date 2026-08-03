#!/usr/bin/env node

// Regenerate shared/data/icons.json and icons-info.json from the installed
// @tabler/icons package. Run `pnpm run import-icons` to bump the package to
// the latest version and refresh the data files.
import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const iconsPackage = join(__dirname, '../node_modules/@tabler/icons')
const iconsTags = JSON.parse(readFileSync(join(iconsPackage, 'icons.json'), 'utf8'))
const { version } = JSON.parse(readFileSync(join(iconsPackage, 'package.json'), 'utf8'))

const prepareSvgFile = (svg) => {
  return svg.replace(/\n/g, '').replace(/>\s+</g, '><').replace(/\s+/g, ' ')
}

let svgList = {}
for (let iconName in iconsTags) {
  let iconData = iconsTags[iconName]
  svgList[iconName] = {
    name: iconName,
    svg: {
      outline: iconData.styles.outline ? prepareSvgFile(readFileSync(join(iconsPackage, `icons/outline/${iconName}.svg`), 'utf8')) : null,
      filled: iconData.styles.filled ? prepareSvgFile(readFileSync(join(iconsPackage, `icons/filled/${iconName}.svg`), 'utf8')) : null,
    },
  }
}

writeFileSync(
  join(__dirname, '../../shared/data/icons-info.json'),
  JSON.stringify({
    version,
    count: Object.values(svgList).reduce((acc, icon) => {
      return acc + (icon.svg.outline ? 1 : 0) + (icon.svg.filled ? 1 : 0)
    }, 0),
  }),
)

writeFileSync(join(__dirname, '../../shared/data/icons.json'), JSON.stringify(svgList))

console.log(`import-icons: imported ${Object.keys(svgList).length} icons from @tabler/icons v${version}`)
