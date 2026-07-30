import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		include: ['astro/lib/**/*.test.ts'],
		globals: true,
	},
});
