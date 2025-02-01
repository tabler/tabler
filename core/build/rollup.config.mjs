import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { babel } from '@rollup/plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import banner from '@repo/banner'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const ESM = process.env.ESM === 'true'

let destinationFile = `tabler${ESM ? '.esm' : ''}`
const external = ['@popperjs/core']
const plugins = [
	babel({
		exclude: 'node_modules/**',
		babelHelpers: 'bundled'
	})
]

plugins.push(
	replace({
		'process.env.NODE_ENV': '"production"',
		preventAssignment: true
	}),
	nodeResolve()
)

const rollupConfig = {
	input: path.resolve(__dirname, `../js/tabler.${ESM ? 'esm' : 'umd'}.js`),
	output: {
		banner: banner(),
		file: path.resolve(__dirname, `../dist/js/${destinationFile}.js`),
		format: ESM ? 'esm' : 'umd',
		generatedCode: 'es2015'
	},
	external,
	plugins
}

if (!ESM) {
	rollupConfig.output.name = 'tabler'
}

export default rollupConfig