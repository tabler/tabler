export default context => {
	return {
		map: false,
		plugins: {
			autoprefixer: {
				cascade: false
			},
			rtlcss: context.env === 'RTL'
		}
	}
}