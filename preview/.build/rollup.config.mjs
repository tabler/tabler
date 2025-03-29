import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { babel } from '@rollup/plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import banner from '@repo/banner'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const external = []
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
	input: [
		path.resolve(__dirname, `../js/demo.js`)
	],
	output: {
		name: 'demo',
		banner: banner('Demo'),
		dir: path.resolve(__dirname, `../dist/preview/js`),
		format: 'esm',
		generatedCode: 'es2015'
	},
	external,
	plugins
}

export default rollupConfig