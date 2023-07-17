const fs = require('fs')
const path = require('path')
const glob = require('glob')
const { html: beautifyHtml } = require('js-beautify')

const files = glob(path.join(__dirname, '../content/{docs,blog}/**/*.mdx'), {}, (err, files) => {
  files.forEach((file) => {
    let content = fs.readFileSync(file, 'utf-8')

    content = content.replace(/\n\n+/g, '\n\n')

    content = content.replace(/(?<=```html [^\n]+\n)([^`]+)(?=\n```)/g, (m, code) => {
      code = code.trim()

      code = beautifyHtml(code, {
        indent_size: 2,
      })

      return code
    })

    fs.writeFileSync(file, content, 'utf-8')
  })
})
