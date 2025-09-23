import { readFileSync } from "fs";
import { join } from "path";

export function appData(eleventyConfig) {
	eleventyConfig.addGlobalData("package", JSON.parse(readFileSync(join("..", "core", "package.json"), "utf-8")));
	eleventyConfig.addGlobalData("changelog", readFileSync(join("..", "core", "CHANGELOG.md"), "utf-8"));
	eleventyConfig.addGlobalData("libs", JSON.parse(readFileSync(join("..", "core", "libs.json"), "utf-8")));

	// Analytics Environment Variables
	eleventyConfig.addGlobalData("posthogApiKey", process.env.NEXT_PUBLIC_POSTHOG_KEY);
	eleventyConfig.addGlobalData("posthogHost", process.env.NEXT_PUBLIC_POSTHOG_HOST);
}