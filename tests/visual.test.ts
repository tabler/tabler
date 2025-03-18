import test, { expect } from '@playwright/test';
import { argosScreenshot } from "@argos-ci/playwright"
import fs from "fs"
import path from "path"

const previewDir = path.join(__dirname, "../preview/dist")

const htmlFiles = fs.readdirSync(previewDir).filter((file) => file.endsWith(".html"))

for (const file of htmlFiles) {
	test(`Compare ${file}`, async ({ page }) => {
		await page.goto(`file://${path.join(previewDir, file)}`)
		await page.waitForLoadState("networkidle")
		await argosScreenshot(page, `${file}`, {
			threshold: 0.7,
		})
	})
}
