import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { babel } from '@rollup/plugin-babel'
import banner from '../../.build/banner.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const ESM = process.env.ESM === 'true'

let destinationFile = `demo${ESM ? '.esm' : ''}`
const external = []
const plugins = [
	babel({
		exclude: 'node_modules/**',
		babelHelpers: 'bundled'
	})
]
const globals = {
}


const rollupConfig = {
	input: path.resolve(__dirname, `../js/index.js`), //${ESM ? 'esm' : 'umd'}.js`),
	output: {
		banner: banner(),
		file: path.resolve(__dirname, `../dist/js/${destinationFile}.js`),
		format: ESM ? 'esm' : 'umd',
		globals,
		generatedCode: 'es2015'
	},
	external,
	plugins
}

if (!ESM) {
	rollupConfig.output.name = 'demo'
}

export default rollupConfig