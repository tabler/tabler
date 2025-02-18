import test, { expect, Page } from '@playwright/test';
import fs from "fs"
import path from "path"

const previewDir = path.join(__dirname, "../preview/dist")

async function visualDiff(page: Page, url: string) {
	await page.goto(url);
	await expect(page).toHaveScreenshot({ fullPage: true });
}

const htmlFiles = fs.readdirSync(previewDir).filter((file) => file.endsWith(".html"))

for (const file of htmlFiles) {
	test(`Compare ${file}`, async ({ page }) => {
		const filePath = `file://${path.join(previewDir, file)}`
		await page.goto(filePath)

		// Wait for page load
		await page.waitForLoadState("networkidle")

		// Take a screenshot and compare
		await expect(page).toHaveScreenshot(`${file}.png`)
	})
}
