import { cleanup, render } from "@testing-library/svelte";
import { page } from "@vitest/browser/context";
import { afterEach, describe, expect, it, vi } from "vitest";
import PasswordGenerateButton from "../src/components/PasswordGenerateButton.svelte";

const colors = {
  "dark-gray": "rgb(36, 35, 44)",
  gray: "rgb(129, 125, 146)",
  white: "rgb(230, 229, 234)",
  "very-dark-gray": "rgb(24, 23, 31)",
  green: "rgb(164, 255, 175)",
  red: "rgb(246, 74, 74)",
  orange: "rgb(251, 124, 88)",
  yellow: "rgb(248, 205, 101)",
};

describe("PasswordGenerateButton", () => {
  afterEach(() => {
    cleanup();
  });

  it("should call a function when clicked", async () => {
    const fn = vi.fn();
    render(PasswordGenerateButton, { generatePassword: fn });

    const button = page.getByRole("button");
    await expect.element(button).toHaveStyle({ "background-color": colors.green, "color": colors["dark-gray"] });

    await button.hover();
    await expect.element(button).toHaveStyle({ "background-color": colors["dark-gray"], "color": colors.green });

    expect(fn).not.toHaveBeenCalled();
    await button.click();
    expect(fn).toHaveBeenCalledOnce();
  });
})
