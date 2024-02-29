import { globSync } from 'glob';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync, writeFileSync, unlinkSync } from 'fs';
import YAML from 'yaml';

const __dirname = dirname(fileURLToPath(import.meta.url))

const files = globSync(join(__dirname, `../pages/_data/*.yml`))
console.log(files);

files.forEach((file) => {
	const content = YAML.parse(readFileSync(file, 'utf8'))

	writeFileSync(file.replace('.yml', '.json'), JSON.stringify(content, null, 2))
	unlinkSync(file)
})