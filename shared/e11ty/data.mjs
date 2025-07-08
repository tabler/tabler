import { readFileSync } from "fs";
import { join } from "path";

export function appData(eleventyConfig) {
	eleventyConfig.addGlobalData("package", JSON.parse(readFileSync(join("..", "core", "package.json"), "utf-8")));
	eleventyConfig.addGlobalData("changelog", readFileSync(join("..", "core", "CHANGELOG.md"), "utf-8"));
	eleventyConfig.addGlobalData("libs", JSON.parse(readFileSync(join("..", "core", "libs.json"), "utf-8")));
}