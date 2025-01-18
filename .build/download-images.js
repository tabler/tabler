#!/usr/bin/env node

'use strict'

const fs = require('node:fs')
const path = require('node:path')
const request = require('request')
const filePath = path.join(__dirname, '../src/pages/_data/photos.json')

const photos = JSON.parse(fs.readFileSync(filePath, 'utf8'))

const urlTitle = (str) => {
	str = str
		.toLowerCase()
		.replaceAll('&', 'and')
		.replace(/[^[a-z0-9-]/g, '-')
		.replace(/-+/g, '-')

	return str
}

const download = function (uri, filename, callback, error) {
	request.head(uri, function (err, res, body) {
		request(uri).pipe(fs.createWriteStream(filename))
			.on('close', callback)
			.on('error', error)
	})
}

async function downloadPhotos() {
	for (const key in photos) {
		const photo = photos[key]

		let filename, i = 1;

		do {
			filename = `${urlTitle(photo['title'])}${i > 1 ? `-${i}` : ''}.jpg`
			i++
		} while (fs.existsSync(path.join(__dirname, `../src/static/photos/${filename}`)))

		await new Promise((resolve, reject) => {
			download(photo['path'], path.join(__dirname, `../src/static/photos/${filename}`), function () {
				resolve()
			}, function () {
				reject()
			});
		})

		photos[key]['file'] = filename
		photos[key]['horizontal'] = photo['width'] > photo['height']
	}

	fs.writeFileSync(filePath, JSON.stringify(photos))
}

downloadPhotos();

