const iconsPkg = require("../node_modules/@tabler/icons/package.json")
const icons = require("../node_modules/@tabler/icons/tags.json")

const fs = require("fs-extra")
const path = require("path")

const prepareSvgFile = (svg) => {
  return svg.replace(/\n/g, "").replace(/>\s+</g, "><")
}

let svgList = []
for (let iconName in icons) {
  let iconData = icons[iconName]

  svgList.push({
    name: iconName,
    version: iconData.version,
    category: iconData.category,
    tags: iconData.tags,
    unicode: iconData.unicode,
    svg: prepareSvgFile(
      fs
        .readFileSync(
          path.join(
            __dirname,
            `../node_modules/@tabler/icons/icons/${iconName}.svg`
          )
        )
        .toString()
    ),
  })
}

fs.writeFileSync(
  path.join(__dirname, `../data/icons.json`),
  JSON.stringify(svgList)
)
fs.writeFileSync(
  path.join(__dirname, `../data/icons-info.json`),
  JSON.stringify({
    version: iconsPkg.version,
    count: svgList.length,
  })
)

fs.copySync(path.join(__dirname, '../node_modules/@tabler/icons/icons'), path.join(__dirname, '../public/static/tabler-icons/icons'), { overwrite: true })
fs.copySync(path.join(__dirname, '../node_modules/@tabler/icons-png/icons'), path.join(__dirname, '../public/static/tabler-icons/icons-png'), { overwrite: true })
