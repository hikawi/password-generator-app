import { cleanup, render } from "@testing-library/svelte";
import { page } from "@vitest/browser/context";
import { afterEach, describe, expect, it } from "vitest";
import PasswordOptions from "../src/components/PasswordOptions.svelte";

describe("PasswordOptions", () => {
  afterEach(() => {
    cleanup();
  });

  it("should check and uncheck", async () => {
    render(PasswordOptions, { allowUppercase: true, allowLowercase: true, allowNumbers: true, allowSymbols: false });

    const upper = page.getByRole("checkbox", { name: /upper/i });
    const lower = page.getByRole("checkbox", { name: /lower/i });
    const numbers = page.getByRole("checkbox", { name: /numbers/i });
    const symbols = page.getByRole("checkbox", { name: /symbols/i });

    await expect.element(upper).toBeChecked();
    await expect.element(lower).toBeChecked();
    await expect.element(numbers).toBeChecked();
    await expect.element(symbols).not.toBeChecked();
  });
});
