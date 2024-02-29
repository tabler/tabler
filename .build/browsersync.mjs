import bs from 'browser-sync';

bs.init({
	server: {
		baseDir: "_site",
		routes: {
			"/dist": "./dist",
		}
	},
	files: [
		'./dist/*'
	],
	ui: {
		port: 3000
	}
})