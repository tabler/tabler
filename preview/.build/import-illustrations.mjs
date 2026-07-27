#!/usr/bin/env node

// Regenerate shared/data/illustrations.json from the PNG files in
// shared/static/illustrations/light. Run `pnpm run import-illustrations`
// after adding or removing illustration files.
import { globSync, writeFileSync } from 'node:fs';
import { join, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const illustrations = globSync(join(__dirname, '../../shared/static/illustrations/light/*.png'))
	.map((file) => basename(file, '.png'))
	.sort();

writeFileSync(
	join(__dirname, '../../shared/data/illustrations.json'),
	JSON.stringify(illustrations),
);

console.log(`import-illustrations: imported ${illustrations.length} illustrations`);
