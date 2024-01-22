import browserSync from 'browser-sync'

browserSync({ 
	server: {
		baseDir: "./dist",
		routes: {
			"/static": "static",
			"/dist": "node_modules/@tabler/core/dist",
		}
	},
	port: 3000,
	notify: false,
	watch: true,
	open: false,
	// snippet: false,
});