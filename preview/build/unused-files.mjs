import { sync } from 'glob';
import { readFileSync } from 'fs';
import { join } from 'path';

const srcDir = join(__dirname, '../src')

let foundFiles = []
sync(`${srcDir}/pages/**/*.{html,md}`).forEach((file) => {
	let fileContent = readFileSync(file)

	fileContent.toString().replace(/\{% include(_cached)? "([a-z0-9\/_-]+\.html)"/g, (f, c, filename) => {
		filename = `${srcDir}/pages/_includes/${filename}`

		if (!foundFiles.includes(filename)) {
			foundFiles.push(filename)
		}
	})
})

let includeFiles = sync(`${srcDir}/pages/_includes/**/*.html`)

includeFiles.forEach((file) => {
	if (!foundFiles.includes(file)) {
		console.log('file', file)
	}
})