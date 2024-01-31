const mapConfig = {
	inline: false,
	annotation: true,
	sourcesContent: true
}

export default context => {
	return {
		map: mapConfig,
		plugins: {
			autoprefixer: {
				cascade: false
			},
			rtlcss: context.env === 'RTL'
		}
	}
}