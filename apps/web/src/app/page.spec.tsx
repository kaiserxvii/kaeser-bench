import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import Page from "./page";

test("the home page identifies the benchmark and its current generation boundary", () => {
  render(<Page />);

  expect(screen.getByRole("heading", { level: 1, name: "Kaeser Bench" })).toBeDefined();
  expect(screen.getByText("Generation results, with the evidence attached.")).toBeDefined();
});
