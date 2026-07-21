// Parity gate: every page listed in parity-manifest.json must produce a DOM
// semantically identical to the Eleventy build (compare-dom.py → IDENTICAL),
// or match a frozen, reviewed diff (knownDiff). Run via `pnpm test`.
//
// References are built with Eleventy (NODE_ENV=development) into .parity/
// (gitignored) and cached; pass --refresh to rebuild them.
//
// One shared copy for all Astro packages: run from the package directory
// (`node ../.build/parity.mjs`) — the package root is process.cwd(), the
// repo root and compare-dom.py are resolved relative to this script.
import { execFileSync, execSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = process.cwd();
const scriptDir = dirname(fileURLToPath(import.meta.url));
const repo = join(scriptDir, '..');
const cache = join(root, '.parity');
const refresh = process.argv.includes('--refresh');

const manifest = JSON.parse(readFileSync(join(root, 'parity-manifest.json'), 'utf8'));

const referenceDirs = {
	preview: { pkg: join(repo, 'preview'), out: join(cache, 'eleventy-dist') },
	docs: { pkg: join(repo, 'docs'), out: join(cache, 'docs-dist') },
};

const sourcesNeeded = new Set(manifest.pages.map((p) => p.source));
for (const source of sourcesNeeded) {
	const { pkg, out } = referenceDirs[source];
	if (existsSync(out) && !refresh) continue;
	console.log(`parity: building ${source} reference (Eleventy, NODE_ENV=development)...`);
	execSync('npx eleventy --output=' + JSON.stringify(out), {
		cwd: pkg,
		env: { ...process.env, NODE_ENV: 'development' },
		stdio: ['ignore', 'ignore', 'inherit'],
	});
}

mkdirSync(join(cache, 'diff'), { recursive: true });

let failures = 0;
for (const page of manifest.pages) {
	const ref = join(referenceDirs[page.source].out, page.ref);
	const dist = join(root, 'dist', page.dist);
	const label = `${page.source}/${page.dist}`;

	if (!existsSync(dist)) {
		console.log(`FAIL ${label} — missing ${dist} (run the build first)`);
		failures++;
		continue;
	}

	let output;
	try {
		output = execFileSync(
			'python3',
			[join(scriptDir, 'compare-dom.py'), ref, dist, '--out-dir', join(cache, 'diff')],
			{ encoding: 'utf8' },
		);
	} catch (error) {
		output = String(error.stdout ?? '');
	}

	if (output.startsWith('IDENTICAL')) {
		console.log(`PASS ${label} — IDENTICAL`);
		continue;
	}

	if (page.knownDiff) {
		const frozen = readFileSync(join(root, page.knownDiff), 'utf8').trim();
		const current = readFileSync(join(cache, 'diff', 'semantic.diff'), 'utf8').trim();
		if (frozen === current) {
			console.log(`PASS ${label} — matches frozen known diff (${page.knownDiff})`);
			continue;
		}
		console.log(`FAIL ${label} — diff deviates from the frozen known diff (${page.knownDiff});`);
		console.log(`     current diff: ${join(cache, 'diff', 'semantic.diff')}`);
		failures++;
		continue;
	}

	console.log(`FAIL ${label} — ${output.split('\n')[0]}`);
	failures++;
}

if (failures > 0) {
	console.error(`parity: ${failures} page(s) failed`);
	process.exit(1);
}
console.log(`parity: all ${manifest.pages.length} page(s) pass`);
