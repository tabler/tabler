// Rebuild Astro's public directory from source and generated workspace assets.
// Runs as an Astro integration (astro:config:done) instead of a standalone
// pre-script, so the copy is ordered by Astro's own lifecycle for both dev and
// build — mirrors Bootstrap's site/src/libs/astro.ts integration.
import { copyFileSync, cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const repo = join(root, '..');
const publicDir = join(root, 'public');

const copies = [
	{
		from: join(root, 'assets'),
		to: publicDir,
		packageName: '@tabler/docs',
		requiredFile: join(root, 'assets', 'css', 'docs.css'),
	},
	{
		from: join(repo, 'core', 'dist'),
		to: join(publicDir, 'dist'),
		packageName: '@tabler/core',
		requiredFile: join(repo, 'core', 'dist', 'css', 'tabler.css'),
	},
	{
		// Sourced from preview's isolated tmp-assets/ (not dist/) — dist/ is Astro's own
		// build output there, and reading demo assets from it caused unbounded growth
		// across repeated builds. See preview/.build/copy-assets.mjs.
		from: join(repo, 'preview', 'tmp-assets'),
		to: join(publicDir, 'preview'),
		packageName: '@tabler/preview',
		requiredFile: join(repo, 'preview', 'tmp-assets', 'css', 'demo.css'),
	},
	{
		from: join(repo, 'shared', 'static'),
		to: join(publicDir, 'static'),
		packageName: 'shared assets',
		requiredFile: join(repo, 'shared', 'static', 'logo.svg'),
	},
];

/** @returns {import('astro').AstroIntegration} */
export function copyAssets() {
	/** @type {string} */
	let command;
	return {
		name: 'copy-assets',
		hooks: {
			'astro:config:setup': (options) => {
				command = options.command;
			},
			'astro:config:done': ({ logger }) => {
				// `astro check`/`astro sync` (command 'sync') runs these hooks too, but
				// only needs types — public/ is irrelevant there and CI's type-check
				// job has no built workspace assets to copy.
				if (command === 'sync') return;
				rmSync(publicDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
				mkdirSync(publicDir, { recursive: true });

				for (const { from, to, packageName, requiredFile } of copies) {
					if (!existsSync(from) || !existsSync(requiredFile)) {
						throw new Error(`copy-assets: missing ${requiredFile} — build ${packageName} first`);
					}

					cpSync(from, to, {
						recursive: true,
						dereference: true,
						filter: src => !src.includes('/.vscode') && !src.includes('\\.vscode'),
					});
				}

				logger.info('public/ rebuilt from workspace assets');
			},
			'astro:server:setup': ({ server, logger }) => {
				if (command !== 'dev') return;
				// The copy above runs once at startup, so edits to core's scss/js during
				// `pnpm run dev` (rebuilt into core/dist by its watchers) would never reach
				// the served public/ copy. Watch the generated sources, sync changed files
				// into public/, and trigger a browser reload (debounced — one sass rebuild
				// rewrites a dozen css files at once).
				const syncDirs = [
					{ from: join(repo, 'core', 'dist'), to: join(publicDir, 'dist') },
					{ from: join(repo, 'preview', 'tmp-assets'), to: join(publicDir, 'preview') },
					{ from: join(root, 'assets'), to: publicDir },
					{ from: join(repo, 'shared', 'static'), to: join(publicDir, 'static') },
				];
				server.watcher.add(syncDirs.map(dir => dir.from));
				let reloadTimer;
				const sync = file => {
					for (const { from, to } of syncDirs) {
						if (!file.startsWith(from + sep)) continue;
						const dest = join(to, relative(from, file));
						mkdirSync(dirname(dest), { recursive: true });
						copyFileSync(file, dest);
						// Source maps piggyback on their css/js file's reload. build-css.mjs
						// buffers all writes into one tight burst, so a short quiet window is
						// enough to coalesce a whole rebuild into a single reload.
						if (file.endsWith('.map')) return;
						clearTimeout(reloadTimer);
						reloadTimer = setTimeout(() => {
							server.hot.send({ type: 'full-reload' });
							logger.info(`reloaded after change in ${relative(repo, file)}`);
						}, 250);
						return;
					}
				};
				server.watcher.on('add', sync);
				server.watcher.on('change', sync);
			},
		},
	};
}
