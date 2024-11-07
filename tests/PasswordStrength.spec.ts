import { cleanup, render } from "@testing-library/svelte";
import { page } from "@vitest/browser/context";
import { afterEach, describe, expect, it } from "vitest";
import PasswordStrength from "../src/components/PasswordStrength.svelte";

const passwords = {
  "": 0,
  "a": 1,
  "$": 1,
  "1": 1,
  "aa": 1,
  "$$": 1,
  "11": 1,
  "aaa": 1,
  "$$$": 1,
  "111": 1,
  "a$": 2,
  "$1": 2,
  "a1": 2,
  "a1$": 3,
  "A1$": 3,
  "Aa1": 3,
  "Aa1$": 4,
  "Aa1$z": 4,
  "A42dc3$c": 4,
  "1234567890": 2,
  "ASDh7$dan#": 5,
  "AAAAAAAAAAAAAAAAAAAAAAAAAA": 2,
};

const ratings = ["OK LOL", "TOO WEAK!", "WEAK", "MEDIUM", "STRONG"];

describe("PasswordStrength", () => {
  afterEach(() => {
    cleanup();
  });

  for (const [pw, str] of Object.entries(passwords)) {
    it(`should show correct rating of ${str} for \"${pw}\"`, async () => {
      render(PasswordStrength, { password: pw });
      const rating = ratings[Math.min(str, 4)];
      await expect.element(page.getByText(rating)).toBeVisible();
    });
  }
});
