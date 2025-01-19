#!/usr/bin/env node

'use strict'

const fs = require('fs'),
	path = require('path'),
	glob = require('glob');

const illustrations = glob
	.sync(path.join(__dirname, `../src/static/illustrations/light/*.png`))
	.map((file) => {
		return path.basename(file, '.png')
	})

fs.writeFileSync(
	path.join(__dirname, `../src/pages/_data/illustrations.json`),
	JSON.stringify(illustrations)
)


// let i = {}
// const dirs = ['light', 'dark', 'autodark']
// const ilustrations = ['not-found', 'computer-fix', 'boy-with-key', 'boy-girl']

// for(const dir of dirs) {
// 	i[dir] = {}

// 	for(const ilustration of ilustrations) {
// 		let svg = fs.readFileSync(path.join(__dirname, `../src/pages/_free-illustrations/${dir}/${ilustration}.svg`), 'utf8')

// 		svg = svg
// 			.replace(/\n+/g, ' ')
// 			.replace(/>\s+</g, '><')
// 			.replace(/\s+/g, ' ')
// 			.replace(/^[\n\s-]+/, '')

// 		i[dir][ilustration] = svg
// 	}
// }

// fs.writeFileSync(
// 	path.join(__dirname, `../src/pages/_data/free-illustrations.json`),
// 	JSON.stringify(i)
// )