import { describe, expect, test } from "bun:test";
import { evaluationDimensions } from "./index";

describe("evaluation dimension vocabulary", () => {
  test("contains unique, stable identifiers", () => {
    expect(new Set(evaluationDimensions).size).toBe(evaluationDimensions.length);
    expect(evaluationDimensions.every((dimension) => /^[a-z]+(?:-[a-z]+)*$/.test(dimension))).toBe(
      true,
    );
  });
});
