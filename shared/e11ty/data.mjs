import { readFileSync } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url))

export function getCopyList () {
	let copy = {
		"node_modules/@tabler/core/dist": "dist",
	}

	const libs = JSON.parse(readFileSync(join(__dirname, '../data/libs.json')));

	let files = []

	Object.keys(libs.js).forEach((lib) => {
		files.push(Array.isArray(libs.js[lib]) ? libs.js[lib] : [libs.js[lib]])
	})

	Object.keys(libs.css).forEach((lib) => {
		files.push(Array.isArray(libs.css[lib]) ? libs.css[lib] : [libs.css[lib]])
	})

	Object.keys(libs['js-copy']).forEach((lib) => {
		files.push(libs['js-copy'][lib])
	})

	files = files.flat()

	files.forEach((file) => {
		if (!file.match(/^https?/)) {
			copy[`node_modules/${dirname(file)}`] = `libs/${dirname(file)}`;
		}
	})

	return copy;
}

export function appData(eleventyConfig) {
}