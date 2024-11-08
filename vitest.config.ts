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
  test: {
    css: true,
    setupFiles: ["./tests/vitest-setup.ts"],
    reporters: process.env.CI ? ["github-actions", ["junit", { outputFile: "./test-results/tests.xml" }]] : "default",
    coverage: {
      provider: "istanbul",
      reportOnFailure: process.env.CI == "true",
      reportsDirectory: "./test-results",
      reporter: process.env.CI ? ["text", "json"] : ["text-summary", "text", "html-spa"],
      exclude: [...coverageConfigDefaults.exclude, "./src/pages/**/*", "./src/assets/**/*"],
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
