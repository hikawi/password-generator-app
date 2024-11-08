import { cleanup, render } from "@testing-library/svelte";
import { page, userEvent } from "@vitest/browser/context";
import { afterEach, describe, expect, it } from "vitest";
import CharacterLengthSlider from "../src/components/CharacterLengthSlider.svelte";

describe("CharacterLengthSlider", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render the value", async () => {
    render(CharacterLengthSlider, { value: 10 });
    await expect.element(page.getByText("10")).toBeVisible();

    const input = page.getByRole("slider");
    await expect.element(input).toHaveStyle({ "--value": "50%" }); // 10/20
  });

  it("should update the value", async () => {
    render(CharacterLengthSlider, { value: 15 });

    const input = page.getByRole("slider");
    await userEvent.keyboard("{Tab}");
    await expect.element(input).toHaveFocus();

    await userEvent.keyboard("{ArrowLeft}{ArrowLeft}{ArrowLeft}");
    await expect.element(input).toHaveStyle({ "--value": "60%" }); // 12/20
  });
});
