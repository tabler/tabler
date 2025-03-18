// #!/usr/bin/env node

// import { readFileSync, createWriteStream, existsSync, writeFileSync } from 'node:fs'
// import { join, dirname } from 'node:path'
// import request, { head } from 'request'
// import { fileURLToPath } from 'node:url';

// const __dirname = dirname(fileURLToPath(import.meta.url))

// const filePath = join(__dirname, '..', 'preview', 'pages', '_data', 'photos.json')

// const photos = JSON.parse(readFileSync(filePath, 'utf8'))

// const urlTitle = (str) => {
// 	str = str
// 		.toLowerCase()
// 		.replaceAll('&', 'and')
// 		.replace(/[^[a-z0-9-]/g, '-')
// 		.replace(/-+/g, '-')

// 	return str
// }

// const download = function (uri, filename, callback, error) {
// 	head(uri, function (err, res, body) {
// 		request(uri).pipe(createWriteStream(filename))
// 			.on('close', callback)
// 			.on('error', error)
// 	})
// }

// async function downloadPhotos() {
// 	for (const key in photos) {
// 		const photo = photos[key]

// 		let filename, i = 1;

// 		do {
// 			filename = `${urlTitle(photo['title'])}${i > 1 ? `-${i}` : ''}.jpg`
// 			i++
// 		} while (existsSync(join(__dirname, `../preview/static/photos/${filename}`)))

// 		await new Promise((resolve, reject) => {
// 			download(photo['path'], join(__dirname, `../preview/static/photos/${filename}`), function () {
// 				resolve()
// 			}, function () {
// 				reject()
// 			});
// 		})

// 		photos[key]['file'] = filename
// 		photos[key]['horizontal'] = photo['width'] > photo['height']
// 	}

// 	writeFileSync(filePath, JSON.stringify(photos))
// }

// downloadPhotos();

