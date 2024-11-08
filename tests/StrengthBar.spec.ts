import { act, cleanup, render } from "@testing-library/svelte/svelte5";
import { page } from "@vitest/browser/context";
import { afterEach, describe, expect, it } from "vitest";
import StrengthBar from "../src/components/StrengthBar.svelte";

describe("StrengthBar", () => {
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


  afterEach(() => {
    cleanup();
  });

  it("should show 0 filled bars", async () => {
    render(StrengthBar, { strength: 0 });
    expect(page.getByTestId("filled").all()).toHaveLength(0);
    expect(page.getByTestId("empty").all()).toHaveLength(4);
  });

  it("should show 1 red bar", async () => {
    render(StrengthBar, { strength: 1 });
    const filled = page.getByTestId("filled").all();
    expect(filled).toHaveLength(1);
    filled.forEach(async locator => {
      await expect.element(locator).toHaveStyle({ "background-color": colors.red });
    });
    expect(page.getByTestId("empty").all()).toHaveLength(3);
  });

  it("should show 2 orange bars", async () => {
    render(StrengthBar, { strength: 2 });
    const filled = page.getByTestId("filled").all();
    expect(filled).toHaveLength(2);
    filled.forEach(async locator => {
      await expect.element(locator).toHaveStyle({ "background-color": colors.orange });
    });
    expect(page.getByTestId("empty").all()).toHaveLength(2);
  });

  it("should show 3 yellow bars", async () => {
    render(StrengthBar, { strength: 3 });
    const filled = page.getByTestId("filled").all();
    expect(filled).toHaveLength(3);
    filled.forEach(async locator => {
      await expect.element(locator).toHaveStyle({ "background-color": colors.yellow });
    });
    expect(page.getByTestId("empty").all()).toHaveLength(1);
  });

  it("should show 4 green bars", async () => {
    render(StrengthBar, { strength: 4 });
    const filled = page.getByTestId("filled").all();
    expect(filled).toHaveLength(4);
    filled.forEach(async locator => {
      await expect.element(locator).toHaveStyle({ "background-color": colors.yellow });
    });
    expect(page.getByTestId("empty").all()).toHaveLength(0);
  });

  it("should be able to change", async () => {
    const comp = render(StrengthBar, { strength: 0 });

    const filled = page.getByTestId("filled");
    const empty = page.getByTestId("empty");
    expect(filled.all()).toHaveLength(0);
    expect(empty.all()).toHaveLength(4);

    await act(() => comp.rerender({ strength: 2 }));
    expect(filled.all()).toHaveLength(2);
    expect(empty.all()).toHaveLength(2);
  });

  it("test", async () => {
    const comp = render(StrengthBar, { strength: 3 });
    expect(comp.getByTestId("bars").children).toHaveLength(4);
  })
});
