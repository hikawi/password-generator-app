import { cleanup, render } from "@testing-library/svelte";
import { page, userEvent } from "@vitest/browser/context";
import { afterEach, describe, expect, it } from "vitest";
import PasswordGenerator from "../src/components/PasswordGenerator.svelte";

describe("PasswordGenerator", () => {
  afterEach(() => {
    cleanup();
  });

  it("should show generated password", async () => {
    render(PasswordGenerator);

    const pw = page.getByTestId("password");
    await expect.element(pw).not.toBeInTheDocument();

    const button = page.getByRole("button", { name: /generate/i });
    await button.click();
    await expect.element(pw).toBeInTheDocument();
  });

  it("should not generate if length is 0", async () => {
    render(PasswordGenerator);

    const pw = page.getByTestId("password");
    await expect.element(pw).not.toBeInTheDocument();

    // Turn the slider down to 0.
    const input = page.getByRole("slider");
    (input.element() as HTMLElement).focus();
    for (let index = 0; index < 10; index++) {
      await userEvent.keyboard("{ArrowLeft}");
    }

    const button = page.getByRole("button", { name: /generate/i });

    // Doesn't do anything with length 0.
    await button.click();
    await expect.element(pw).not.toBeInTheDocument();

  });

  it("should not do anything with no charsets checked", async () => {
    render(PasswordGenerator);

    const pw = page.getByTestId("password");
    await expect.element(pw).not.toBeInTheDocument();

    const button = page.getByRole("button", { name: /generate/i });
    const upper = page.getByRole("checkbox", { name: /upper/i });
    const lower = page.getByRole("checkbox", { name: /lower/i });
    const numbers = page.getByRole("checkbox", { name: /numbers/i });
    const symbols = page.getByRole("checkbox", { name: /symbols/i });

    await upper.click();
    await expect.element(upper).not.toBeChecked();
    await lower.click();
    await expect.element(lower).not.toBeChecked();
    await numbers.click();
    await expect.element(numbers).not.toBeChecked();
    await expect.element(symbols).not.toBeChecked();

    await button.click();
    await expect.element(pw).not.toBeInTheDocument();
  });

  it("should generate according to options", async () => {
    render(PasswordGenerator);

    const pw = page.getByTestId("password");

    const upper = page.getByRole("checkbox", { name: /upper/i });
    const lower = page.getByRole("checkbox", { name: /lower/i });
    const numbers = page.getByRole("checkbox", { name: /numbers/i });
    const symbols = page.getByRole("checkbox", { name: /symbols/i });
    const button = page.getByRole("button", { name: /generate/i });

    await upper.click();
    await expect.element(upper).not.toBeChecked();

    await lower.click();
    await expect.element(lower).not.toBeChecked();

    await numbers.click();
    await expect.element(numbers).not.toBeChecked();

    await symbols.click();
    await expect.element(symbols).toBeChecked();

    await button.click();
    await expect.element(pw).toBeInTheDocument();
    await expect.element(pw).toHaveTextContent(/^[^A-Za-z0-9]+$/g);
  });
});
