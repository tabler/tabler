const glob = require('glob');
const fs = require('fs')
const path = require('path')

const srcDir = path.join(__dirname, '../src')

let foundFiles = []
glob.sync(`${srcDir}/pages/**/*.{html,md}`).forEach((file) => {
	let fileContent = fs.readFileSync(file)

	fileContent.toString().replace(/\{% include(_cached)? "([a-z0-9\/_-]+\.html)"/g, (f, c, filename) => {
		filename = `${srcDir}/pages/_includes/${filename}`

		if (!foundFiles.includes(filename)) {
			foundFiles.push(filename)
		}
	})
})

let includeFiles = glob.sync(`${srcDir}/pages/_includes/**/*.html`)

includeFiles.forEach((file) => {
	if (!foundFiles.includes(file)) {
		console.log('file', file)
	}
})