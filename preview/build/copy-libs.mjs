
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { exec } from 'node:child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))

const allLibs = JSON.parse(readFileSync(join(__dirname, '../pages/_data/libs.json')))

let files = []

Object.keys(allLibs.js).forEach((lib) => {
	files.push(Array.isArray(allLibs.js[lib]) ? allLibs.js[lib] : [allLibs.js[lib]])
})

Object.keys(allLibs.css).forEach((lib) => {
	files.push(Array.isArray(allLibs.css[lib]) ? allLibs.css[lib] : [allLibs.css[lib]])
})

Object.keys(allLibs['js-copy']).forEach((lib) => {
	files.push(allLibs['js-copy'][lib])
})

files = files.flat()

console.log(files);

files.forEach((file) => {
	if (!file.match(/^https?/)) {
		let dir = dirname(file)
			.replace('@', '')

		let cmd = `mkdir -p dist/libs/${dir} && cp -r -L node_modules/${dirname(file)}/* dist/libs/${dir}`

		console.log(cmd);

		exec(cmd)
	}
})