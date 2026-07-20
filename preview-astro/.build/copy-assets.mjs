// Equivalent of the Eleventy passthrough copies: static assets are generated
// into public/ before dev/build (public/ is fully generated — see .gitignore).
import { cpSync, existsSync, mkdirSync, copyFileSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const repo = join(root, '..');

const copies = [
	// @tabler/core dist (css/js/fonts/img/libs) — same as the Eleventy passthrough
	{
		from: join(root, 'node_modules', '@tabler', 'core', 'dist'),
		to: join(root, 'public', 'dist'),
		required: true,
		allowDestinationFallback: true,
	},
	// demo css/js built by the @tabler/preview sass/vite pipeline
	// TODO(phase 3): move that pipeline into this package
	{ from: join(repo, 'preview', 'dist', 'preview'), to: join(root, 'public', 'preview'), required: false },
	// docs.css built by the @tabler/docs sass pipeline (used by docs pages)
	{ from: join(repo, 'docs', 'dist', 'css'), to: join(root, 'public', 'css'), required: false },
	// static assets (photos, avatars, tracks, brand svgs...).
	// Use the real source because preview/static is a symlink that may not survive deployment packaging.
	{ from: join(repo, 'shared', 'static'), to: join(root, 'public', 'static'), required: true },
	// favicons (source assets of @tabler/preview)
	{ from: join(repo, 'preview', 'pages', 'favicon.ico'), to: join(root, 'public', 'favicon.ico'), required: true },
	{ from: join(repo, 'preview', 'pages', 'favicon-dev.ico'), to: join(root, 'public', 'favicon-dev.ico'), required: true },
];

for (const { from, to, required, allowDestinationFallback } of copies) {
	if (!existsSync(from)) {
		const message = `copy-assets: missing ${from}`;
		if (allowDestinationFallback && existsSync(to)) {
			console.warn(`${message} (using existing ${to})`);
			continue;
		}
		if (required) throw new Error(`${message} — run the build of that package first`);
		console.warn(`${message} (skipped — build @tabler/preview or @tabler/docs to get it)`);
		continue;
	}
	mkdirSync(dirname(to), { recursive: true });
	if (from.endsWith('.ico')) {
		copyFileSync(from, to);
	} else {
		// dereference: sources may be symlinks (e.g. preview/static → shared/static).
		// For fallback-enabled copies (core dist), keep existing destination as a safety net
		// in case source files disappear mid-copy during parallel clean/build tasks.
		if (!allowDestinationFallback) {
			// remove the target first so a stale symlink never survives
			try {
				rmSync(to, { recursive: true, force: true });
			} catch (error) {
				if (!(error && typeof error === 'object' && error.code === 'ENOTEMPTY')) {
					throw error;
				}
			}
		}
		try {
			cpSync(from, to, {
				recursive: true,
				dereference: true,
				filter: src => !src.includes('/.vscode') && !src.includes('\\.vscode'),
			});
		} catch (error) {
			// In turbo dev, @tabler/core can clean dist while we copy it.
			// If fallback is allowed and destination exists, keep current assets.
			if (
				allowDestinationFallback &&
				error &&
				typeof error === 'object' &&
				error.code === 'ENOENT' &&
				existsSync(to)
			) {
				console.warn(`copy-assets: source changed during copy ${from} (using existing ${to})`);
				continue;
			}
			throw error;
		}
	}
}
console.log('copy-assets: done');
