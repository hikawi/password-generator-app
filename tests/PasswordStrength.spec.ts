import { cleanup, render } from "@testing-library/svelte";
import { page } from "@vitest/browser/context";
import { afterEach, describe, expect, it } from "vitest";
import PasswordStrength from "../src/components/PasswordStrength.svelte";

const passwordTestSuites = {
  "": 0,
  "a": 1,
  "ab": 1,
  "aA": 2,
  "aSB": 2,
  "$$$": 1,
  "a@s": 2,
  "AadsWSwsdawW": 3,
  "ThisPasswordSux": 3,
  "jKUjkW$lO": 3,
  "jDSJkaLL00$": 4,
  "ThisPa55w0rdDoesnt$ux": 5,
}

function getRating(num: number) {
  switch (num) {
    case 0:
      return "OK LOL";
    case 1:
      return "TOO WEAK!";
    case 2:
      return "WEAK";
    case 3:
      return "MEDIUM";
    default:
      return "STRONG";
  }
}

describe("PasswordStrength", () => {
  afterEach(() => {
    cleanup();
  });

  for (const [pw, rat] of Object.entries(passwordTestSuites)) {
    it(`should give correct rating for \"${pw}\"`, async () => {
      render(PasswordStrength, { password: pw });
      expect.element(page.getByText(getRating(rat))).toBeVisible();
    });
  }
});
