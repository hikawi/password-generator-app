import { cleanup, render } from "@testing-library/svelte";
import { page } from "@vitest/browser/context";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import PasswordDisplay from "../src/components/PasswordDisplay.svelte";

describe("PasswordDisplay", () => {
  let clipboard = "Clipboard";
  const writeMock = vi.fn((e) => clipboard = e);
  const readMock = vi.fn(async () => clipboard);

  beforeEach(() => {
    vi.useFakeTimers();
    navigator.clipboard.writeText = writeMock;
    navigator.clipboard.readText = readMock;
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it("should not have password shown", async () => {
    render(PasswordDisplay, { password: "" });
    await expect.element(page.getByTestId("password")).not.toBeInTheDocument();
  });

  it("should have '?' if copied empty string", async () => {
    render(PasswordDisplay, { password: "" });
    const button = page.getByRole("button");

    await expect.element(button).toBeVisible();
    expect(writeMock).not.toHaveBeenCalled();
    await button.click();
    expect(writeMock).toHaveBeenCalled();

    const clipboardText = await navigator.clipboard.readText();
    expect(clipboardText).toBeFalsy();

    const copiedText = page.getByText("Copied...?");
    await expect.element(copiedText).toBeVisible();

    vi.advanceTimersByTime(2000);
    await expect.element(copiedText).toBeVisible();

    vi.advanceTimersByTime(1000);
    await expect.element(copiedText).not.toBeVisible();
  });

  it("should copy password", async () => {
    const password = "APassword123$$@";
    render(PasswordDisplay, { password });

    const button = page.getByRole("button");
    await expect.element(button).toBeVisible();
    expect(writeMock).not.toHaveBeenCalled();
    await button.click();
    expect(writeMock).toHaveBeenCalled();

    const clipboardText = await navigator.clipboard.readText();
    expect(clipboardText).toEqual(password);

    const copiedText = page.getByText("Copied");
    vi.advanceTimersByTime(2000);
    await expect.element(copiedText).toBeVisible();

    vi.advanceTimersByTime(1000);
    await expect.element(copiedText).not.toBeVisible();
  });
});
