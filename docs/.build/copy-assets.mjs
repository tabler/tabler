// Rebuild Astro's public directory from source and generated workspace assets.
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
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
		from: join(repo, 'preview', 'dist', 'preview'),
		to: join(publicDir, 'preview'),
		packageName: '@tabler/preview',
		requiredFile: join(repo, 'preview', 'dist', 'preview', 'css', 'demo.css'),
	},
	{
		from: join(repo, 'shared', 'static'),
		to: join(publicDir, 'static'),
		packageName: 'shared assets',
		requiredFile: join(repo, 'shared', 'static', 'logo.svg'),
	},
];

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

console.log('copy-assets: done');
