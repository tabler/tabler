#!/usr/bin/env node

import { writeFileSync } from 'node:fs';
import { join, basename, dirname } from 'node:path';
import { sync } from 'glob';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url))

const illustrations = sync(join(__dirname, `../static/illustrations/light/*.png`))
	.map((file) => {
		return basename(file, '.png')
	})

writeFileSync(
	join(__dirname, `../pages/_data/illustrations.json`),
	JSON.stringify(illustrations)
)