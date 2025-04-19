import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { babel } from '@rollup/plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import dotenv from "rollup-plugin-dotenv"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const external = []
const plugins = [
	dotenv({
		cwd: path.resolve(__dirname, '../..'),
	}),
	babel({
		exclude: 'node_modules/**',
		babelHelpers: 'bundled'
	})
]

plugins.push(
	replace({
		'process.env.NODE_ENV': '"production"',
		'process.env.DOCSEARCH_APP_ID': process.env.DOCSEARCH_APP_ID,
		'process.env.DOCSEARCH_INDEX_NAME': process.env.DOCSEARCH_INDEX_NAME,
		'process.env.DOCSEARCH_API_KEY': process.env.DOCSEARCH_API_KEY,
		preventAssignment: true
	}),
	nodeResolve()
)

const rollupConfig = {
	input: [
		path.resolve(__dirname, `../js/docs.js`)
	],
	output: {
		name: 'docs',
		dir: path.resolve(__dirname, `../dist/js`),
		format: 'esm',
		generatedCode: 'es2015'
	},
	external,
	plugins
}

export default rollupConfig