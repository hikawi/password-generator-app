import { act, cleanup, render } from '@testing-library/svelte';
import { afterEach, describe, expect, it } from "vitest";
import StrengthBar from '../src/components/StrengthBar.svelte';

describe("StrengthBar", () => {
  const colors = {
    red: "#F64A4A",
    orange: "#FB7C58",
    yellow: "#f8CD65",
    green: "#A4FFAF",
  };

  function hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    const res = {
      r: parseInt(result![1], 16),
      g: parseInt(result![2], 16),
      b: parseInt(result![3], 16)
    };
    return `rgb(${res.r}, ${res.g}, ${res.b})`;
  }

  function countChildrenColors(parent: HTMLElement) {
    let obj: any = { red: 0, orange: 0, yellow: 0, green: 0 };
    for (const child of parent.children) {
      const styles = window.getComputedStyle(child);
      for (const entry of Object.entries(colors)) {
        if (styles.backgroundColor == hexToRgb(entry[1])) {
          obj[entry[0]]++;
          break;
        }
      }
    }
    return obj;
  }

  afterEach(() => {
    cleanup();
  });

  it("should have 1 red bar", async () => {
    const comp = render(StrengthBar, { strength: 1 });
    const bars = comp.getByTestId("bars");
    const colors = countChildrenColors(bars);

    expect(colors.red).toBe(1);
    expect(colors.orange).toBe(0);
    expect(colors.yellow).toBe(0);
    expect(colors.green).toBe(0);
  });

  it("should have 2 orange bars", async () => {
    const comp = render(StrengthBar, { strength: 2 });
    const bars = comp.getByTestId("bars");
    const colors = countChildrenColors(bars);

    expect(colors.red).toBe(0);
    expect(colors.orange).toBe(2);
    expect(colors.yellow).toBe(0);
    expect(colors.green).toBe(0);
  });

  it("should have 3 yellow bars", async () => {
    const comp = render(StrengthBar, { strength: 3 });
    const bars = comp.getByTestId("bars");
    const colors = countChildrenColors(bars);

    expect(colors.red).toBe(0);
    expect(colors.orange).toBe(0);
    expect(colors.yellow).toBe(3);
    expect(colors.green).toBe(0);
  });

  it("should have 4 green bars", async () => {
    const comp = render(StrengthBar, { strength: 4 });
    const bars = comp.getByTestId("bars");
    const colors = countChildrenColors(bars);

    expect(colors.red).toBe(0);
    expect(colors.orange).toBe(0);
    expect(colors.yellow).toBe(0);
    expect(colors.green).toBe(4);
  });

  it("should be able to change", async () => {
    const { getByTestId, component } = render(StrengthBar, { strength: 1 });
    const bars = getByTestId("bars");

    component.$set({ strength: 2 });
    await act();

    const colors = countChildrenColors(bars);
    expect(colors.red).toBe(0);
    expect(colors.orange).toBe(2);
    expect(colors.yellow).toBe(0);
    expect(colors.green).toBe(0);
  });
});
