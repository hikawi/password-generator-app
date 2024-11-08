/// <reference types="vitest" />
import svelte from "@astrojs/svelte";
import { svelteTesting } from '@testing-library/svelte/vite';
import { getViteConfig } from "astro/config";
import { coverageConfigDefaults } from "vitest/config";

export default getViteConfig({
  plugins: [svelte(), svelteTesting()],
  resolve: process.env.VITEST
    ? {
      conditions: ['browser']
    }
    : undefined,
  optimizeDeps: {
    include: ["@vitest/coverage-istanbul", "svelte/internal/client", "svelte/internal/flags/legacy"],
  },
  test: {
    css: true,
    setupFiles: ["./tests/vitest-setup.ts"],
    reporters: process.env.CI ? ["verbose", ["junit", { outputFile: "./test-results/tests.xml" }]] : "default",
    coverage: {
      provider: "istanbul",
      reportOnFailure: process.env.CI == "true",
      reportsDirectory: "./test-results",
      reporter: process.env.CI ? ["text", "json", "lcovonly"] : ["text-summary", "text", "html-spa"],
      exclude: [...coverageConfigDefaults.exclude, "**/*.astro"],
      include: ["**"],
    },
    browser: {
      provider: "playwright",
      headless: true,
      enabled: true,
      name: "chromium",
      screenshotDirectory: "./failures",
    },
  }
});
