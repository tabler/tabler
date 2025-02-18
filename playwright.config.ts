import { defineConfig, devices } from "@playwright/test"

export default defineConfig({
	testDir: "./tests",
	timeout: 10000,
	fullyParallel: true,
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
	],
	use: {
		trace: "on-first-retry",
		screenshot: "only-on-failure",
	},
	reporter: [
		process.env.CI ? ["dot"] : ["list"],
		["@argos-ci/playwright/reporter", { uploadToArgos: !!process.env.CI }],
	],
})