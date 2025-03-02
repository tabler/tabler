export default context => {
	return {
		map: {
			inline: false,
			annotation: true,
			sourcesContent: true
		},
		plugins: {
			autoprefixer: {
				cascade: false
			},
			rtlcss: context.env === 'RTL'
		}
	}
}