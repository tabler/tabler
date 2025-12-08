import { readFileSync } from "fs";
import { join, dirname } from "path";

import { fileURLToPath } from "url";

export function appData(eleventyConfig) {
	const currentDir = dirname(fileURLToPath(import.meta.url));

	console.log('currentDir', currentDir);

	eleventyConfig.addGlobalData("package", JSON.parse(readFileSync(join(currentDir, "..", "..", "core", "package.json"), "utf-8"))) ; 
	eleventyConfig.addGlobalData("changelog", readFileSync(join(currentDir, "..", "..", "core", "CHANGELOG.md"), "utf-8"));  
	eleventyConfig.addGlobalData("libs", JSON.parse(readFileSync(join(currentDir, "..", "..", "core", "libs.json"), "utf-8")));

	// Analytics Environment Variables
	eleventyConfig.addGlobalData("posthogApiKey", process.env.NEXT_PUBLIC_POSTHOG_KEY);
	eleventyConfig.addGlobalData("posthogHost", process.env.NEXT_PUBLIC_POSTHOG_HOST);
}